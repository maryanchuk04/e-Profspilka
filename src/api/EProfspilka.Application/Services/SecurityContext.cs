using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using EProfspilka.Core.Interfaces;

namespace EProfspilka.Application.Services;

public class SecurityContext(IHttpContextAccessor httpContextAccessor, ILogger<SecurityContext> logger)
    : ISecurityContext
{
    public Guid GetCurrentUserId()
    {
        var guidClaim = httpContextAccessor.HttpContext?.User.FindFirst($"{TokenService.ClaimBaseAddress}/userId");

        if (guidClaim != null && Guid.TryParse(guidClaim.Value, out var result)) 
            return result;

        logger.LogError("guidClaim for User token not found");
        throw new Exception("User not found");
    }
}