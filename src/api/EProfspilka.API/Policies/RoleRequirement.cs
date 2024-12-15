using Microsoft.AspNetCore.Authorization;

namespace EProfspilka.Policies;

public class RoleRequirement(string role) : IAuthorizationRequirement
{
    public string Role { get; set; } = role;
}
