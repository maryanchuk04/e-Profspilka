using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.Services;

public class QuestionService : IQuestionService
{
	private readonly AppDbContext _dbContext;
	private readonly IMapper _mapper;

	public QuestionService(AppDbContext dbContext, IMapper mapper)
	{
		_dbContext = dbContext;
		_mapper = mapper;
	}

	public async Task<IEnumerable<QuestionDto>> GetAllAsync()
	{
		return _mapper.Map<IEnumerable<QuestionDto>>(await _dbContext.Questions.ToListAsync());
	}

	public async Task<QuestionDto> CreateAsync(QuestionDto questionDto)
	{
		var entity = await _dbContext.Questions.AddAsync(new Question()
		{
			QuestionText = questionDto.QuestionText,
			Answer = questionDto.Answer
		});

		await _dbContext.SaveChangesAsync();

		return _mapper.Map<QuestionDto>(entity.Entity);
	}

	public async Task<QuestionDto> UpdateAsync(QuestionDto questionDto)
	{
		var entity = await _dbContext.Questions.FirstOrDefaultAsync(x => x.Id == questionDto.Id);

		if (entity == null)
		{
			throw new NotFoundException(nameof(Question), questionDto.Id);
		}

		entity.Answer = questionDto.Answer;
		entity.QuestionText = questionDto.QuestionText;

		_dbContext.Update(entity);
		await _dbContext.SaveChangesAsync();

		return _mapper.Map<QuestionDto>(entity);
	}

	public async Task DeleteAsync(Guid id)
	{
		var question = await _dbContext.Questions.FirstOrDefaultAsync(x => x.Id == id);

		if (question == null)
		{
			throw new NotFoundException(nameof(Question), id);
		}

		_dbContext.Remove(question);
		await _dbContext.SaveChangesAsync();
	}
}