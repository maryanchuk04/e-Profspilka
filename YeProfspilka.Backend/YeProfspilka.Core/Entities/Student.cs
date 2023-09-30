using System.ComponentModel.DataAnnotations.Schema;
using YeProfspilka.Core.Entities.Base;

namespace YeProfspilka.Core.Entities;

public class Student : BaseEntity
{
	public string FullName { get; set; }

	public string Email { get; set; }

	public string Facultet { get; set; }

	public int Course { get; set; }

	public bool IsMemberProf { get; set; }

	public Guid? UserId { get; set; }

	[ForeignKey("UserId")]
	public User User { get; set; }
}