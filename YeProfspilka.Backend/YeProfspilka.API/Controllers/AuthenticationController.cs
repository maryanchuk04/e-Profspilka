using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Application.Configurations;
using YeProfspilka.Backend.Extension;
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

	public AuthenticationController(
		IAuthenticationService authenticationService,
		IUserServices userServices,
		AppConfiguration configuration
		)
	{
		_authenticationService = authenticationService;
		_userServices = userServices;
		_configuration = configuration;
	}

	[HttpPost]
	public async Task<IActionResult> Login([FromBody] EmailViewModel emailViewModel)
	{
		try
		{
			var authenticateResponseModel = await _authenticationService.Authenticate(emailViewModel.Email);

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

	[NonAction]
	[HttpPost]
	private async Task<IActionResult> Login()
	{
		try
		{
			return Ok();
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}

	[HttpPost("google")]
	public async Task<IActionResult> GoogleAuthenticate([FromBody]GoogleViewModel googleViewModel)
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

	[HttpPost("logout")]
	public IActionResult Logout()
	{
		HttpContext.DeleteRefreshToken();
		return Ok();
	}
}