using EProfspilka.Core.Enumerations;

namespace EProfspilka.Core.Models;

public class UserMatchingStoreModel
{
    public Guid? Id { get; set; }

    public string? FullName { get; set; }

    public string Email { get; set; }

    public string? Avatar { get; set; }

    public string? Facultet { get; set; }

    public bool? IsMemberProf { get; set; }

    public int? Course { get; set; }

    public Role? Role { get; set; }
}