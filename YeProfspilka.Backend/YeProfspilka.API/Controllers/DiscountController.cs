using MediatR;
using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Application.CommandHandlers;
using YeProfspilka.Backend.ViewModels;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[Route("discount")]
public class DiscountController : ControllerBase
{
    private readonly IDiscountService _discountService;
    private readonly IMediator _mediator;

    public DiscountController(IDiscountService discountService, IMediator mediator)
    {
        _discountService = discountService;
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IEnumerable<DiscountDto>> GetAllAsync() => await _discountService.GetAsync();

    [HttpGet]
    [Route("search")]
    public async Task<ActionResult<IEnumerable<DiscountDto>>> SearchAsync([FromQuery] string searchWord)
    {
        try
        {
            return Ok(await _mediator.Send(new SearchDiscountCommand(searchWord)));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(Guid id)
    {
        try
        {
            return Ok(await _discountService.GetByIdAsync(id));
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

    [HttpPost]
    public async Task<IActionResult> CreateAsync(DiscountViewModel model)
    {
        try
        {
            var result = await _discountService.CreateAsync(new DiscountDto()
            {
                CodeWord = model.CodeWord,
                Description = model.Description,
                IsOpen = model.IsOpen,
                Name = model.Name
            });

            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync(DiscountDto discountDto)
    {
        try
        {
            var result = await _discountService.UpdateAsync(discountDto);

            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        try
        {
            await _discountService.DeleteAsync(id);
            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }
}