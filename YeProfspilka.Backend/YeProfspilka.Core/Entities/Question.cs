using YeProfspilka.Core.Entities.Base;

namespace YeProfspilka.Core.Entities;

public class Question : BaseEntity
{
	public string QuestionText { get; set; }

	public string Answer { get; set; }
}