using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EProfspilka.Core.Models;

namespace EProfspilka.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class SiteSettingsController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpGet]
    public async Task<ActionResult> GetSiteSettings()
    {
        try
        {
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }
}
