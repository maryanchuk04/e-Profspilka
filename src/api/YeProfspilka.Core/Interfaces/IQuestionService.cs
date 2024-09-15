using YeProfspilka.Core.Models;

namespace YeProfspilka.Core.Interfaces;

public interface IQuestionService
{
	Task<IEnumerable<QuestionDto>> GetAllAsync();

	Task<QuestionDto> CreateAsync(QuestionDto questionDto);

	Task<QuestionDto> UpdateAsync(QuestionDto questionDto);

	Task DeleteAsync(Guid id);
}