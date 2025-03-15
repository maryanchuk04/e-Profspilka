using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace EProfspilka.API.Controllers;

[ApiController]
[Route("partners")]
public class PartnersController(IPartnersService partnersService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetQuestions()
    {
        try
        {
            return Ok(await partnersService.GetAllAsync());
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpPost]
    // TODO Uncomment this lines
    //[Authorize(Policy = PolicyNames.ModeratorAndAdminPolicyName)]
    public async Task<IActionResult> CreateQuestion([FromBody] PartnerDto partner)
    {
        try
        {
            var res = await partnersService.CreateAsync(partner);
            return Ok(res);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update(PartnerDto partnerDto)
    {
        try
        {
            return Ok(await partnersService.UpdateAsync(partnerDto));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpDelete("{id}")]
    //[Authorize(Policy = PolicyNames.ModeratorAndAdminPolicyName)]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await partnersService.DeleteAsync(id);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }
}