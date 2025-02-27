using EProfspilka.Application.CommandHandlers.Auth;
using EProfspilka.Core.Settings;
using EProfspilka.Infrastructure.Google.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace EProfspilka.API.Controllers;

[ApiController]
[Route("api/authenticate/google")]
public class GoogleAuthenticationController(
    ILogger<AuthenticationController> logger,
    IMediator mediator,
    IOptions<UISettings> authOptions) : ControllerBase
{
    private readonly UISettings _uiSettings = authOptions.Value;

    [HttpGet("callback")]
    public async Task<IActionResult> GoogleCallbackAsync([FromQuery] string code, CancellationToken cancellationToken)
    {
        var redirectUri = _uiSettings.BaseAddress;

        try
        {
            var command = new GoogleCallbackCommand(code);
            var result = await mediator.Send(command, cancellationToken);
            redirectUri += $"/api/auth/callback?token={result.JwtToken}";

            logger.LogInformation("Frontend redirectURI = '{FrontendRedirectUri}'", redirectUri);
        }
        catch (СanNotObtainGoogleAccessTokenException ex)
        {
            redirectUri = "/unauthorized";
            logger.LogError(ex, "Cannot obtain google access token exception occured, redirect to '{FrontendRedirectUri}'", redirectUri);
        }

        return Redirect(redirectUri);
    }
}
