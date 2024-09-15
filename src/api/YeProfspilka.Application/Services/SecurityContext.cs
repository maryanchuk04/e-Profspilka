using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using YeProfspilka.Core.Interfaces;

namespace YeProfspilka.Application.Services;

public class SecurityContext : ISecurityContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<SecurityContext> _logger;

    public SecurityContext(IHttpContextAccessor httpContextAccessor, ILogger<SecurityContext> logger)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public Guid GetCurrentUserId()
    {
        var guidClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Name);

        if (guidClaim == null || !Guid.TryParse(guidClaim.Value, out var result))
        {
            _logger.LogError("guidClaim for User token not found");
            throw new Exception("User not found");
        }

        return result;
    }
}