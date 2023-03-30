using YeProfspilka.Core.Entities.Base;

namespace YeProfspilka.Core.Entities;

public class StudentStore : BaseEntity
{
	public string FullName { get; set; }

	public string Email { get; set; }

	public bool IsPaidDues { get; set; }
}