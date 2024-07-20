using AutoMapper;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;
using Microsoft.EntityFrameworkCore;

namespace EProfispilka.Application.Services;

public class QuestionService(YeProfspilkaContext dbContext, IMapper mapper) : IQuestionService
{
    public async Task<IEnumerable<QuestionDto>> GetAllAsync()
    {
        return mapper.Map<IEnumerable<QuestionDto>>(await dbContext.Questions.ToListAsync());
    }

    public async Task<QuestionDto> CreateAsync(QuestionDto questionDto)
    {
        var entity = await dbContext.Questions.AddAsync(new Question()
        {
            QuestionText = questionDto.QuestionText,
            Answer = questionDto.Answer
        });

        await dbContext.SaveChangesAsync();

        return mapper.Map<QuestionDto>(entity.Entity);
    }

    public async Task<QuestionDto> UpdateAsync(QuestionDto questionDto)
    {
        var entity = await dbContext.Questions.FirstOrDefaultAsync(x => x.Id == questionDto.Id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Question), questionDto.Id);
        }

        entity.Answer = questionDto.Answer;
        entity.QuestionText = questionDto.QuestionText;

        dbContext.Update(entity);
        await dbContext.SaveChangesAsync();

        return mapper.Map<QuestionDto>(entity);
    }

    public async Task DeleteAsync(Guid id)
    {
        var question = await dbContext.Questions.FirstOrDefaultAsync(x => x.Id == id);

        if (question == null)
        {
            throw new NotFoundException(nameof(Question), id);
        }

        dbContext.Remove(question);
        await dbContext.SaveChangesAsync();
    }
}