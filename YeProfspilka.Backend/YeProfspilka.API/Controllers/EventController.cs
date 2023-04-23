using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Backend.Policies;
using YeProfspilka.Backend.ViewModels;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[Route("event")]
//[Authorize(Policy = PolicyNames.ModeratorAndAdminPolicyName)]
public class EventController : ControllerBase
{
	private readonly IEventService _eventService;
	private readonly IMapper _mapper;

	public EventController(IEventService eventService, IMapper mapper)
	{
		_eventService = eventService;
		_mapper = mapper;
	}

	[HttpPost]
	public async Task<IActionResult> Create([FromBody] EventViewModel eventViewModel)
	{
		try
		{
			var eventDto = await _eventService.Create(_mapper.Map<EventDto>(eventViewModel));

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
			return Ok(await _eventService.Get());
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}

	[HttpGet("{id}")]
	[AllowAnonymous]
	public async Task<IActionResult> Get(Guid id)
	{
		try
		{
			return Ok(await _eventService.Get(id));
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
			await _eventService.Delete(id);
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
			return Ok(await _eventService.Update(eventDto));
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