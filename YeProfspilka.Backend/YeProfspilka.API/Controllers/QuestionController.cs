using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YeProfspilka.Backend.Policies;
using YeProfspilka.Backend.ViewModels;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Controllers;

[ApiController]
[Route("question")]
public class QuestionController : ControllerBase
{
	private readonly IQuestionService _questionService;

	public QuestionController(IQuestionService questionService)
	{
		_questionService = questionService;
	}

	[HttpGet]
	public async Task<IActionResult> GetQuestions()
	{
		try
		{
			return Ok(await _questionService.GetAllAsync());
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}

	[HttpPost]
	// TODO Uncomment this lines
	//[Authorize(Policy = PolicyNames.ModeratorAndAdminPolicyName)]
	public async Task<IActionResult> CreateQuestion([FromBody] QuestionViewModel questionViewModel)
	{
		try
		{
			await _questionService.CreateAsync(new QuestionDto
			{
				Answer = questionViewModel.Answer,
				QuestionText = questionViewModel.QuestionText
			});
			return Ok();
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}

	[HttpPut]
	public async Task<IActionResult> Update(QuestionDto questionDto)
	{
		try
		{
			return Ok(await _questionService.UpdateAsync(questionDto));
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}

	[HttpDelete("{id}")]
	[Authorize(Policy = PolicyNames.ModeratorAndAdminPolicyName)]
	public async Task<IActionResult> Delete(Guid id)
	{
		try
		{
			await _questionService.DeleteAsync(id);
			return Ok();
		}
		catch (Exception e)
		{
			return BadRequest(new ErrorResponseModel(e.Message));
		}
	}
}