using Microsoft.AspNetCore.Mvc;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;

namespace EProfspilka.Controllers;

[ApiController]
[Route("advantage")]
public class AdvantageController(IAdvantageService advantageService) : ControllerBase
{
    [HttpGet]
    public async Task<AdvantageDto[]> GetAll() => await advantageService.GetAll();

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        try
        {
            return Ok(await advantageService.GetById(id));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AdvantageDto advantageDto)
    {
        try
        {
            return Ok(await advantageService.Create(advantageDto));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] AdvantageDto advantageDto)
    {
        try
        {
            return Ok(await advantageService.Update(advantageDto));
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
            await advantageService.Delete(id);
            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }
}