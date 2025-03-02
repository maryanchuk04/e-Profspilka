using EProfspilka.API.ViewModels;
using EProfspilka.Application.CommandHandlers.Discounts;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EProfspilka.API.Controllers;

[ApiController]
[Route("discount")]
public class DiscountController(IDiscountService discountService, IMediator mediator, ISecurityContext securityContext) : ControllerBase
{
    [HttpGet]
    public async Task<IEnumerable<DiscountDto>> GetAllAsync() => await discountService.GetAsync();

    [HttpGet("shared")]
    public async Task<ActionResult<IEnumerable<DiscountDto>>> GetSharedDiscountsAsync()
    {
        try
        {
            return Ok(await mediator.Send(new GetSharedDiscountCommand()));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpGet]
    [Route("search")]
    public async Task<ActionResult<IEnumerable<DiscountDto>>> SearchAsync([FromQuery] string searchWord)
    {
        try
        {
            return Ok(await mediator.Send(new SearchDiscountCommand(searchWord)));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpGet("user")]
    [Authorize]
    public async Task<ActionResult<IList<DiscountDto>>> GetUserDiscountsAsync(CancellationToken cancellationToken)
    {
        var currentUserId = securityContext.GetCurrentUserId();

        if (currentUserId == Guid.Empty)
            return Unauthorized();

        var cmd = new GetUserDiscountsCommand(currentUserId);
        var discounts = await mediator.Send(cmd, cancellationToken);

        return Ok(discounts);
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(Guid id)
    {
        try
        {
            return Ok(await discountService.GetByIdAsync(id));
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
    public async Task<IActionResult> CreateAsync(CreateDiscountViewModel model)
    {
        try
        {
            var result = await discountService.CreateAsync(new DiscountDto
            {
                WithBarCode = model.WithBarCode,
                WithQrCode = model.WithQrCode,
                BarCodeImage = model.BarCodeImage,
                Description = model.Description,
                DiscountType = model.DiscountType,
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
            var result = await discountService.UpdateAsync(discountDto);

            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        try
        {
            await discountService.DeleteAsync(id);
            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }
}