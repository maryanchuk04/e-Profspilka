using EProfspilka.Core.Enumerations;

namespace EProfspilka.Core.Responses;

public class UserManagementModel
{
    public Guid Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }

    public bool IsActive { get; set; }
    public DateTime? LastLoginDateTimeUtc { get; set; }

    public string Faculty { get; set; }
    public int? Course { get; set; }
    public string Picture { get; set; }
    public List<Role> Roles { get; set; }
}