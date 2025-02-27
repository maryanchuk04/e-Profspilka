using Azure.Core;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Infrastructure.Google;
using MediatR;

namespace EProfspilka.Application.CommandHandlers.Auth;

public class GoogleCallbackCommand(string googleCallbackCode) : IRequest<AuthenticateResponseModel>
{
    public string GoogleCallbackCode { get; set; } = googleCallbackCode;
}

public class GoogleCallbackCommandHandler(IGoogleAuthClient googleAuthClient, IAuthenticationService authenticationService) : IRequestHandler<GoogleCallbackCommand, AuthenticateResponseModel>
{
    public async Task<AuthenticateResponseModel> Handle(GoogleCallbackCommand request, CancellationToken cancellationToken)
    {
        var googleAccessToken = await googleAuthClient.ExchangeCodeForTokenAsync(request.GoogleCallbackCode, cancellationToken);

        var googleUser = await googleAuthClient.GetUserInfoAsync(googleAccessToken, cancellationToken);

        var authResponseModel = await authenticationService.AuthenticateAsync(googleUser.Email, googleUser.Picture);

        return authResponseModel;
    }
}