using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[Route("user")]
[Authorize]
public class UserController : ControllerBase
{
	private readonly IUserServices _userServices;

	public UserController(IUserServices userServices)
	{
		_userServices = userServices;
	}

	[HttpGet]
	public async Task<IActionResult> GetCurrentUser()
	{
		try
		{
			return Ok(await _userServices.GetCurrentUser());
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}
}