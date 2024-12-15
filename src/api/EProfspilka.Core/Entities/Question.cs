using EProfspilka.Core.Entities.Base;

namespace EProfspilka.Core.Entities;

public class Question : BaseEntity
{
	public string QuestionText { get; set; }

	public string Answer { get; set; }
}