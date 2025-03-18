using EProfspilka.API.Extension;
using EProfspilka.API.Utils;
using EProfspilka.API.ViewModels;
using EProfspilka.Application.CommandHandlers;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EProfspilka.API.Controllers;

[ApiController]
[Route("authenticate")]
[AllowAnonymous]
public class AuthenticationController(
    IAuthenticationService authenticationService,
    ILogger<AuthenticationController> logger,
    IMediator mediator)
    : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> AdminLogin([FromBody] EmailViewModel emailViewModel)
    {
        try
        {
            var authenticateResponseModel = await authenticationService.AuthenticateAsync(emailViewModel.Email, emailViewModel.Avatar);
            logger.LogInformation("Successful Google Authenticate user with Email: {Email}", emailViewModel.Email);
            HttpContext.SetAdminCookies(authenticateResponseModel);

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
        HttpContext.ClearApplicationCookies();
        return Ok();
    }
}