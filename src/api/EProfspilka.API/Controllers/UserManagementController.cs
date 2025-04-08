using EProfspilka.Application.CommandHandlers;
using EProfspilka.Application.CommandHandlers.UserManagement;
using EProfspilka.Application.CommandHandlers.Users;
using EProfspilka.Application.Factories;
using EProfspilka.Core;
using EProfspilka.Core.Models;
using EProfspilka.Core.Requests;
using EProfspilka.Core.Responses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EProfspilka.API.Controllers;

[ApiController]
[Route("[controller]")]
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

    [HttpPost("{userId}/AssignRole")]
    public async Task<ActionResult<OperationResponse>> AssignRoleForUserAsync(Guid userId, AssignRoleRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var result = await mediator.Send(
                new AssignRoleForUserCommand(userId, request.Role), cancellationToken);

            return Ok(result);
        }
        catch (Exception)
        {
            var error = new OperationResponse(false, ErrorCodes.UnhandledError);
            return StatusCode(500, error);
        }
    }
}