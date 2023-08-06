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
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;
    private readonly IUserServices _userServices;
    private readonly AppConfiguration _configuration;
    private readonly IMediator _mediator;
    private readonly ILogger<AuthenticationController> _logger;

    public AuthenticationController(
        IAuthenticationService authenticationService,
        IUserServices userServices,
        AppConfiguration configuration,
        ILogger<AuthenticationController> logger, IMediator mediator)
    {
        _authenticationService = authenticationService;
        _userServices = userServices;
        _configuration = configuration;
        _logger = logger;
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] EmailViewModel emailViewModel)
    {
        try
        {
            var authenticateResponseModel = await _authenticationService.Authenticate(emailViewModel.Email);
            _logger.LogInformation("Successful Google Authenticate user with Email: {Email}", emailViewModel.Email);
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
            if (googleViewModel.Hd != _configuration.DomainEmail)
            {
                return BadRequest(new ErrorResponseModel("Ви не можете зареєструватися під даним емейлом! Оберіть емейл вашого закладу!"));
            }

            if (await _userServices.UserIsExist(googleViewModel.Email))
            {
                return await Login(new EmailViewModel(googleViewModel.Email));
            }

            var authenticateResponseModel = await _authenticationService
                .Registration(googleViewModel.Email, googleViewModel.FullName, googleViewModel.Avatar);

            _logger.LogInformation("Successful registration new user with Email: {email}", googleViewModel.Email);

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
                _logger.LogWarning("Refresh token incorrect. Execute logout");
                return BadRequest(new ErrorResponseModel("Refresh token is incorrect"));
            }

            var result = await _mediator.Send(new RefreshTokenCommand(refreshToken));
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