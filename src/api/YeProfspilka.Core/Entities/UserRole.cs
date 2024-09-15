using System.ComponentModel.DataAnnotations;

namespace YeProfspilka.Core.Entities;

public class UserRole
{
	[Key]
	public Enumerations.Role RoleId { get; set; }

	public Guid UserId { get; set; }

	public virtual User User { get; set; }

	public virtual Role Role { get; set; }
}