using EProfspilka.Core.Entities.Base;

namespace EProfspilka.Core.Entities;

public class User : BaseEntity
{
	public string Email { get; set; }

	public string  FullName { get; set; }

	public Image Image { get; set; }

	public string? Facultet { get; set; }

	public int? Course { get; set; }

	public ICollection<UserRole> UserRoles { get; set; }

	public ICollection<UserToken> UserTokens { get; set; }

    public bool IsActive { get; set; }
}