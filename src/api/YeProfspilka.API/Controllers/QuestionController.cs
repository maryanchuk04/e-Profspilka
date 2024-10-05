using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Backend.Policies;
using YeProfspilka.Backend.ViewModels;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[Route("question")]
public class QuestionController(IQuestionService questionService) : ControllerBase
{
    [HttpGet]
	public async Task<IActionResult> GetQuestions()
	{
		try
		{
			return Ok(await questionService.GetAllAsync());
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}

	[HttpPost]
	[Authorize]
	public async Task<IActionResult> CreateQuestion([FromBody] QuestionViewModel questionViewModel)
	{
		try
		{
			var res = await questionService.CreateAsync(new QuestionDto
			{
				Answer = questionViewModel.Answer,
				QuestionText = questionViewModel.QuestionText
			});
			return Ok(res);
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}

	[HttpPut]
	[Authorize]
	public async Task<IActionResult> Update(QuestionDto questionDto)
	{
		try
		{
			return Ok(await questionService.UpdateAsync(questionDto));
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}

	[HttpDelete("{id}")]
	[Authorize]
	public async Task<IActionResult> Delete(Guid id)
	{
		try
		{
			await questionService.DeleteAsync(id);
			return Ok();
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}
}