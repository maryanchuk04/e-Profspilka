using YeProfspilka.Core.Entities.Base;

namespace YeProfspilka.Core.Entities;

public class UserToken : BaseEntity
{
	public Guid UserId { get; set; }

	public User User { get; set; }

	public string Token { get; set; }

	public DateTime Expires { get; set; }

	public DateTime Created { get; set; }

	public DateTime? Revoked { get; set; }

	public string ReplacedByToken { get; set; } = string.Empty;
}