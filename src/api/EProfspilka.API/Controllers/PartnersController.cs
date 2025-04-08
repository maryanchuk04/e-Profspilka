using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Infrastructure.FileStorage.Exceptions;
using EProfspilka.Infrastructure.FileStorage;
using Microsoft.AspNetCore.Mvc;

namespace EProfspilka.API.Controllers;

[ApiController]
[Route("partners")]
public class PartnersController(IPartnersService partnersService, IImageStorage imageStorage) : ControllerBase
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
    // [Authorize(Policy = PolicyNames.ModeratorAndAdminPolicyName)]
    public async Task<IActionResult> CreatePartnerAsync([FromBody] PartnerDto partner)
    {
        try
        {
            if (!string.IsNullOrWhiteSpace(partner.Image) && partner.Image.StartsWith("data:image/"))
            {
                var base64Data = partner.Image[(partner.Image.IndexOf(',') + 1)..];

                try
                {
                    var imageUrl = await imageStorage.UploadAsync(base64Data);
                    partner.Image = imageUrl;
                }
                catch (ImgBbImageUploadException uploadEx)
                {
                    return BadRequest(new ErrorResponseModel($"Image upload error: {uploadEx.Message}"));
                }
            }

            var result = await partnersService.CreateAsync(partner);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new ErrorResponseModel(ex.Message));
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