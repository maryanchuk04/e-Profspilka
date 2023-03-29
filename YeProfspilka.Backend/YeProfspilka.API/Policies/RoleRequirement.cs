using Microsoft.AspNetCore.Authorization;

namespace YeProfspilka.Backend.Policies;

public class RoleRequirement : IAuthorizationRequirement
{
	public RoleRequirement(string role)
	{
		Role = role;
	}

	public string Role { get; set; }
}
