using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[Route("advantage")]
public class AdvantageController : ControllerBase
{
    private readonly IAdvantageService _advantageService;

    public AdvantageController(IAdvantageService advantageService)
    {
        _advantageService = advantageService;
    }

    [HttpGet]
    public async Task<AdvantageDto[]> GetAll() => await _advantageService.GetAll();

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        try
        {
            return Ok(await _advantageService.GetById(id));
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
            return Ok(await _advantageService.Create(advantageDto));
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
            return Ok(await _advantageService.Update(advantageDto));
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
            await _advantageService.Delete(id);
            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }
}