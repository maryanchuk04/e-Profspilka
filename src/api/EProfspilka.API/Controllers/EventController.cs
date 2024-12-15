using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EProfspilka.ViewModels;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;

namespace EProfspilka.Controllers;

[ApiController]
[Route("event")]
//[Authorize(Policy = PolicyNames.ModeratorAndAdminPolicyName)]
public class EventController(IEventService eventService, IMapper mapper, ILogger<EventController> logger)
    : ControllerBase
{
    private ILogger<EventController> _logger = logger;

    [HttpPost]
	public async Task<IActionResult> Create([FromBody] EventViewModel eventViewModel)
	{
		try
		{
			var eventDto = await eventService.Create(mapper.Map<EventDto>(eventViewModel));

			return StatusCode(StatusCodes.Status201Created, eventDto);
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}

	[HttpGet]
	[AllowAnonymous]
	public async Task<IActionResult> Get()
	{
		try
		{
			return Ok(await eventService.Get());
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}

	[HttpGet("{id}")]
	[AllowAnonymous]
	public async Task<ActionResult<IEnumerable<EventDto>>> Get(Guid id)
	{
		try
		{
			return Ok(await eventService.Get(id));
		}
		catch (NotFoundException e)
		{
			return NotFound(new ErrorResponseModel(e.Message));
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(Guid id)
	{
		try
		{
			await eventService.Delete(id);
			return NoContent();
		}
		catch (NotFoundException e)
		{
			return NotFound(new ErrorResponseModel(e.Message));
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}

	[HttpPut]
	public async Task<IActionResult> Update(EventDto eventDto)
	{
		try
		{
			return Ok(await eventService.Update(eventDto));
		}
		catch (NotFoundException e)
		{
			return NotFound(new ErrorResponseModel(e.Message));
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}
}