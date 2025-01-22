using EProfspilka.Application.CommandHandlers;
using EProfspilka.Application.Factories;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EProfspilka.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserManagementController(
    IMediator mediator,
    ILogger<UserManagementController> logger,
    IImportCommandFactory importCommandFactory)
    : ControllerBase
{
    private const string XlsxContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    [HttpPost("upload")]
    [Authorize]
    public async Task<ActionResult> UploadUsers(IFormFile file, [FromQuery] string importType = "merge")
    {
        try
        {
            if (file.Length == 0)
            {
                return BadRequest(new ErrorResponseModel("Помилка файл пустий!"));
            }

            var filePath = Path.GetTempFileName();
            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var importCommand = importCommandFactory.Create(importType, filePath);

            if (importCommand is null)
            {
                return BadRequest(new ErrorResponseModel("Неіснуючий тип імпорту"));
            }

            return Ok(await mediator.Send(importCommand));

        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
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

    [HttpGet("export")]
    [Authorize]
    public async Task<ActionResult<byte[]>> ExportUsers()
    {
        try
        {
            const string fileName = "users";
            var fileData = await mediator.Send(new ExportUsersCommand());
            logger.LogInformation("Successful created file with users");

            Response.Headers.Append("Access-Control-Expose-Headers", "Content-Disposition");

            return File(fileData, XlsxContentType, fileName + ".xlsx");
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpGet("user/{id}")]
    public async Task<ActionResult<UserMatchingStoreModel>> GetUser(Guid id)
    {
        try
        {
            var matchingUser = await mediator.Send(new GetUserByIdCommand(id));

            return Ok(matchingUser);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }
}