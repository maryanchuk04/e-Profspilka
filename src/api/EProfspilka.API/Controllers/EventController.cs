using AutoMapper;
using EProfspilka.API.ViewModels;
using EProfspilka.Application.CommandHandlers.Events;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EProfspilka.API.Controllers;

[ApiController]
[Route("event")]
//[Authorize(Policy = PolicyNames.ModeratorAndAdminPolicyName)]
public class EventController(IEventService eventService, IMapper mapper, ILogger<EventController> logger, IMediator mediator)
    : ControllerBase
{
    private ILogger<EventController> _logger = logger;

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] EventViewModel eventViewModel, CancellationToken cancellationToken)
    {
        try
        {
            await mediator.Send(new CreateEventCommand(mapper.Map<EventDto>(eventViewModel), eventViewModel.Images), cancellationToken);

            return StatusCode(StatusCodes.Status201Created);
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