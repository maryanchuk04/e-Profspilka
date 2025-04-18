using EProfspilka.Application.CommandHandlers;
using EProfspilka.Application.CommandHandlers.Discounts;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EProfspilka.API.Controllers;

[ApiController]
[AllowAnonymous]
[Route("discount/code")]
public class DiscountCodeController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    [Route("{discountId:guid}")]
    public async Task<ActionResult<DiscountCodeDto>> GenerateDiscountCode(Guid discountId)
    {
        try
        {
            var result = await mediator.Send(new GenerateDiscountCodeCommand(discountId));

            return Ok(result);
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpGet("verify/{discountId:guid}/{discountCodeId:guid}")]
    public async Task<ActionResult<VerifyDiscountResult>> ValidateDiscountCode(Guid discountId, Guid discountCodeId)
    {
        try
        {
            if (discountId == default || discountCodeId == default)
            {
                return BadRequest(new ErrorResponseModel("Incorrect data!"));
            }

            var result = await mediator.Send(new VerifyDiscountCodeCommand(discountId, discountCodeId));

            return Ok(result);
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }
}