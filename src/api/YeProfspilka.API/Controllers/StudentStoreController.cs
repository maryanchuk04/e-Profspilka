using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Application.CommandHandlers;
using YeProfspilka.Application.Factories;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[Route("student-store")]
public class StudentStoreController(
    IStudentStoreService studentStore,
    IMediator mediator,
    ILogger<StudentStoreController> logger,
    IImportCommandFactory importCommandFactory)
    : ControllerBase
{
    private const string XlsxContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    [HttpPost("upload")]
    [Authorize]
    public async Task<ActionResult> UploadUsers(IFormFile file, [FromQuery] string importType = "replace")
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

    [HttpPost]
    public async Task<IActionResult> UploadExcel([FromForm] IFormFile file)
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

            return Ok(await studentStore.UploadUsers(filePath, true));
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
            return Ok(await studentStore.GetAllUsers());
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
            var fileData = await mediator.Send(new ExportStudentsCommand());
            logger.LogInformation("Successful created file with users");

            Response.Headers.Add("Access-Control-Expose-Headers", "Content-Disposition");

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
            var matchingUser = await mediator.Send(new GetStudentUserByIdCommand(id));

            return Ok(matchingUser);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }
}