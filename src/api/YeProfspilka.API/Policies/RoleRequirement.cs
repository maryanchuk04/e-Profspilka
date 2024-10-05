using Microsoft.AspNetCore.Authorization;

namespace YeProfspilka.Backend.Policies;

public class RoleRequirement(string role) : IAuthorizationRequirement
{
    public string Role { get; set; } = role;
}
