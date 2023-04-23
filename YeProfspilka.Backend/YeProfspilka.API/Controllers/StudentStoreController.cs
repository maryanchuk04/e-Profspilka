using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Backend.ViewModels;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[Route("student-store")]
public class StudentStoreController : ControllerBase
{
    private readonly IStudentStoreService _studentStore;

    public StudentStoreController(IStudentStoreService studentStore)
    {
        _studentStore = studentStore;
    }

    [HttpPost]
    public async Task<IActionResult> UploadExcel([FromForm]IFormFile file)
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
}