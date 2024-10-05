using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using YeProfspilka.Core.Interfaces;

namespace YeProfspilka.Application.Services;

public class SecurityContext(IHttpContextAccessor httpContextAccessor, ILogger<SecurityContext> logger)
    : ISecurityContext
{
    public Guid GetCurrentUserId()
    {
        var guidClaim = httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Name);

        if (guidClaim == null || !Guid.TryParse(guidClaim.Value, out var result))
        {
            logger.LogError("guidClaim for User token not found");
            throw new Exception("User not found");
        }

        return result;
    }
}