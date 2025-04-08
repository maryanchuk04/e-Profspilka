namespace EProfspilka.Core.Entities;

public class UserRole
{
    public Guid Id { get; set; }

    public Enumerations.Role RoleId { get; set; }

    public Guid UserId { get; set; }

    public virtual User User { get; set; }

    public virtual Role Role { get; set; }

    public DateTime CreatedAtUtc { get; set; }
    public DateTime UpdatedAtUtc { get; set; }
}