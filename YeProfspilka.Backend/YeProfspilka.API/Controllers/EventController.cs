using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Backend.Policies;
using YeProfspilka.Backend.ViewModels;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Policy = PolicyNames.ModeratorAndAdminPolicyName)]
public class EventController : ControllerBase
{
	private readonly IEventService _eventService;

	public EventController(IEventService eventService)
	{
		_eventService = eventService;
	}

	[HttpPost]
	public async Task<IActionResult> Create([FromBody] EventViewModel eventViewModel)
	{
		try
		{
			// TODO Return Created 201
			return Ok();
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}
}