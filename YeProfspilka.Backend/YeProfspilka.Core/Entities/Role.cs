namespace YeProfspilka.Core.Entities;

public class Role
{
	public Enumerations.Role Id { get; set; }

	public string Name { get; set; }

	public ICollection<UserRole> UserRoles { get; set; }
}