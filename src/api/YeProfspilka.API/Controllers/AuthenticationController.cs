using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Application.CommandHandlers;
using YeProfspilka.Application.Configurations;
using YeProfspilka.Backend.Extension;
using YeProfspilka.Backend.Utils;
using YeProfspilka.Backend.ViewModels;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[Route("authenticate")]
[AllowAnonymous]
public class AuthenticationController(
    IAuthenticationService authenticationService,
    IUserServices userServices,
    AppConfiguration configuration,
    ILogger<AuthenticationController> logger,
    IMediator mediator)
    : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] EmailViewModel emailViewModel)
    {
        try
        {
            var authenticateResponseModel = await authenticationService.Authenticate(emailViewModel.Email);
            logger.LogInformation("Successful Google Authenticate user with Email: {Email}", emailViewModel.Email);
            HttpContext.SetTokenCookie(authenticateResponseModel);

            return Ok(new
            {
                Token = authenticateResponseModel.JwtToken
            });
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpPost("google")]
    public async Task<IActionResult> GoogleAuthenticate([FromBody] GoogleViewModel googleViewModel)
    {
        try
        {
            if (googleViewModel.Hd != configuration.DomainEmail)
            {
                return BadRequest(new ErrorResponseModel("Ви не можете зареєструватися під даним емейлом! Оберіть емейл вашого закладу!"));
            }

            if (await userServices.UserIsExist(googleViewModel.Email))
            {
                return await Login(new EmailViewModel(googleViewModel.Email));
            }

            var authenticateResponseModel = await authenticationService
                .Registration(googleViewModel.Email, googleViewModel.FullName, googleViewModel.Avatar);

            logger.LogInformation("Successful registration new user with Email: {email}", googleViewModel.Email);

            HttpContext.SetTokenCookie(authenticateResponseModel);


            return StatusCode(StatusCodes.Status201Created, new
            {
                Token = authenticateResponseModel.JwtToken
            });
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult> RefreshToken()
    {
        try
        {
            var refreshToken = Request.Cookies[CookieConstants.RefreshTokenKey];

            if (refreshToken is null)
            {
                Logout();
                logger.LogWarning("Refresh token incorrect. Execute logout");
                return BadRequest(new ErrorResponseModel("Refresh token is incorrect"));
            }

            var result = await mediator.Send(new RefreshTokenCommand(refreshToken));
            HttpContext.SetTokenCookie(result);

            return Ok(new
            {
                Token = result.JwtToken
            });
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        HttpContext.DeleteRefreshToken();
        return Ok();
    }
}