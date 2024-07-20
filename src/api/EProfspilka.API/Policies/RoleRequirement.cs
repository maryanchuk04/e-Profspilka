using Microsoft.AspNetCore.Authorization;

namespace EProfspilka.API.Policies;

public class RoleRequirement(string role) : IAuthorizationRequirement
{
    public string Role { get; set; } = role;
}
