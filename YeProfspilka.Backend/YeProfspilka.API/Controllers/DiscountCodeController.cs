using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Application.CommandHandlers;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[AllowAnonymous]
[Route("discount/code")]
public class DiscountCodeController : ControllerBase
{
    private readonly IMediator _mediator;

    public DiscountCodeController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [Route("{discountId:guid}")]
    public async Task<ActionResult<DiscountCodeDto>> GenerateDiscountCode(Guid discountId)
    {
        try
        {
            var result = await _mediator.Send(new GenerateDiscountCodeCommand(discountId));

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
    public async Task<ActionResult<DiscountCodeDto>> ValidateDiscountCode(Guid discountId, Guid discountCodeId)
    {
        try
        {
            if (discountId == default || discountCodeId == default)
            {
                return BadRequest(new ErrorResponseModel("Incorrect data!"));
            }

            var result = await _mediator.Send(new VerifyDiscountCodeCommand(discountId, discountCodeId));

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