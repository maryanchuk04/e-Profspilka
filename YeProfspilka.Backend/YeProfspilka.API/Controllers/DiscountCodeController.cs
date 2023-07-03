using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Application.CommandHandlers;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[Route("[controller]/{discountId:guid}")]
[Authorize]
public class DiscountCodeController : ControllerBase
{
    private readonly IMediator _mediator;

    public DiscountCodeController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
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

    [HttpGet("{discountCodeId:guid}")]
    public async Task<ActionResult<DiscountCodeDto>> ValidateDiscountCode(Guid discountId, Guid discountCodeId)
    {
        try
        {
            var isValid = await _mediator.Send(new VerifyDiscountCodeCommand(discountId, discountCodeId));

            if (!isValid)
            {
                return BadRequest();
            }

            return Ok(isValid);
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