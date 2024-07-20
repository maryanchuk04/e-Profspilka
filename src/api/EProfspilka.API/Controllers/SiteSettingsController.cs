using EProfspilka.Core.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EProfspilka.API.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class SiteSettingsController(IMediator mediator) : ControllerBase
{
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
