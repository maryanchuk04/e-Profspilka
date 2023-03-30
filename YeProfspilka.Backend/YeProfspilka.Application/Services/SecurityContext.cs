using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using YeProfspilka.Core.Interfaces;

namespace YeProfspilka.Application.Services;

public class SecurityContext : ISecurityContext
{
	private readonly IHttpContextAccessor _httpContextAccessor;

	public SecurityContext(IHttpContextAccessor httpContextAccessor)
	{
		_httpContextAccessor = httpContextAccessor;
	}

	public Guid GetCurrentUserId()
	{
		var guidClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Name);

		if (guidClaim == null || !Guid.TryParse(guidClaim.Value, out var result))
		{
			throw new Exception("User not found");
		}

		return result;
	}
}