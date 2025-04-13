using EProfspilka.Application.CommandHandlers.Auth;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Settings;
using EProfspilka.Infrastructure.Google.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace EProfspilka.API.Controllers;

[ApiController]
[Route("authenticate/google")]
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
        catch (CanNotObtainGoogleAccessTokenException ex)
        {
            redirectUri += "/unauthorized?reasonCode=google_auth_error";
            logger.LogError(ex,
                "Cannot obtain google access token exception occured, redirect to '{FrontendRedirectUri}'",
                redirectUri);
        }
        catch (UserNotActiveException ex)
        {
            redirectUri += "/unauthorized?reasonCode=account_disabled";
            logger.LogError(ex, "User not active exception occured");
        }
        catch (DomainNotAllowedException ex)
        {
            redirectUri += "/unauthorized?reasonCode=domain_is_not_acceptable";
            logger.LogError(ex, "Domain is not acceptable");
        }
        catch (AuthenticateException ex)
        {
            redirectUri += "/unauthorized?reasonCode=user_is_not_exist";
            logger.LogError(ex, "User is not exist");
        }

        return Redirect(redirectUri);
    }
}
