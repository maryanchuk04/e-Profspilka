using MediatR;
using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Application.CommandHandlers;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[Route("student-store")]
public class StudentStoreController : ControllerBase
{
    private const string XlsxContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    private readonly IStudentStoreService _studentStore;
    private readonly IMediator _mediator;
    private readonly ILogger<StudentStoreController> _logger;

    public StudentStoreController(
        IStudentStoreService studentStore,
        IMediator mediator,
        ILogger<StudentStoreController> logger)
    {
        _studentStore = studentStore;
        _mediator = mediator;
        _logger = logger;
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

            return Ok(await _studentStore.UploadUsers(filePath, true));
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
            return Ok(await _studentStore.GetAllUsers());
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    // Protect with Admin Role
    [HttpGet("export")]
    public async Task<ActionResult<byte[]>> ExportUsers()
    {
        try
        {
            const string fileName = "users";
            var fileData = await _mediator.Send(new ExportStudentsCommand());
            _logger.LogInformation("Successful created file with users");

            Response.Headers.Add("Access-Control-Expose-Headers", "Content-Disposition");

            return File(fileData, XlsxContentType, fileName + ".xlsx");
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }
}