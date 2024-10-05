using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Backend.Policies;
using YeProfspilka.Backend.ViewModels;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[Route("user")]
[Authorize]
public class UserController(IUserServices userServices) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCurrentUser()
    {
        try
        {
            return Ok(await userServices.GetCurrentUser());
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetUsers() => Ok(await userServices.GetUsers());

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> UpdateUser([FromBody] UserMatchingStoreModel userMatchingStoreModel)
    {
        try
        {
            return Ok(await userServices.UpdateUser(
                userMatchingStoreModel.Id.Value,
                userMatchingStoreModel.Facultet,
                userMatchingStoreModel.Course.Value,
                userMatchingStoreModel.Role.Value));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }
}