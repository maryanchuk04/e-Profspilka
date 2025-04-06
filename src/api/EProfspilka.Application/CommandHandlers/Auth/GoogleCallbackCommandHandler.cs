using EProfspilka.Application.Configurations;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Infrastructure.Google;
using MediatR;

namespace EProfspilka.Application.CommandHandlers.Auth;

public class GoogleCallbackCommand(string googleCallbackCode) : IRequest<AuthenticateResponseModel>
{
    public string GoogleCallbackCode { get; set; } = googleCallbackCode;
}

public class GoogleCallbackCommandHandler(IGoogleAuthClient googleAuthClient, IAuthenticationService authenticationService, AppConfiguration appConfiguration) : IRequestHandler<GoogleCallbackCommand, AuthenticateResponseModel>
{
    public async Task<AuthenticateResponseModel> Handle(GoogleCallbackCommand request, CancellationToken cancellationToken)
    {
        var googleAccessToken = await googleAuthClient.ExchangeCodeForTokenAsync(request.GoogleCallbackCode, cancellationToken);

        var googleUser = await googleAuthClient.GetUserInfoAsync(googleAccessToken, cancellationToken);

        //if (appConfiguration.AllowedDomains.All(d => !googleUser.Email.Contains(d)))
        //    throw new DomainNotAllowedException($"The user with the email = '{googleUser.Email}' did not pass the domain verification");

        var authResponseModel = await authenticationService.AuthenticateOrRegisterAsync(googleUser.Email, googleUser.Name, googleUser.Picture);

        return authResponseModel;
    }
} 