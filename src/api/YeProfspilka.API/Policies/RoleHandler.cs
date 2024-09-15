using Microsoft.AspNetCore.Authorization;

namespace YeProfspilka.Backend.Policies;

public class RoleHandler : AuthorizationHandler<RoleRequirement>
{
	protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, RoleRequirement requirement)
	{
		if (context.User.IsInRole(requirement.Role))
		{
			context.Succeed(requirement);
		}

		return Task.CompletedTask;
	}
}
