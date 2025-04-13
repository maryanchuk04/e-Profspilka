using EProfspilka.Core.Entities.Base;

namespace EProfspilka.Core.Entities;

public class User : BaseEntity
{
    public string Email { get; set; }

    public string FullName { get; set; }

    public Image Image { get; set; }

    public string Faculty { get; set; }

    public int? Course { get; set; }

    public virtual ICollection<UserRole> UserRoles { get; set; }

    public bool IsActive { get; set; } = true;

    public ICollection<UserToken> UserTokens { get; set; }

    public ICollection<UserDiscounts> UserDiscounts { get; set; }

    public DateTime? LastLoginDateTimeUtc { get; set; }
}