using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Backend.ViewModels;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

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
	public async Task<IActionResult> CreateQuestion([FromBody] PartnerViewModel partnerViewModel)
	{
		try
		{
			var res = await partnersService.CreateAsync(new PartnerDto
			{
				SubText = partnerViewModel.SubText,
				SubTextLink = partnerViewModel.SubTextLink,
				Image = partnerViewModel.Image,
				MainText = partnerViewModel.MainText
			});
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