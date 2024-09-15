using YeProfspilka.Core.Entities.Base;

namespace YeProfspilka.Core.Entities;

public class StudentStore : BaseEntity
{
	public string FullName { get; set; }

	public string Email { get; set; }

	public string Facultet { get; set; }

	public int Course { get; set; }

	public bool IsMemberProf { get; set; }
}