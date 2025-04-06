using System.Text.Json;
using System.Net.Http.Headers;
using EProfspilka.Infrastructure.Google.Models;
using Microsoft.Extensions.Options;
using EProfspilka.Infrastructure.Google.Exceptions;

namespace EProfspilka.Infrastructure.Google;

public interface IGoogleAuthClient
{
    Task<string> ExchangeCodeForTokenAsync(string code, CancellationToken cancellationToken);
    Task<GoogleUserInfo> GetUserInfoAsync(string accessToken, CancellationToken cancellationToken);
}

public class GoogleAuthClient(HttpClient httpClient, IOptions<GoogleClientSettings> googleClientOptions): IGoogleAuthClient
{
    private const string GoogleAuthApiEndpoint = "https://oauth2.googleapis.com/token";
    private const string GoogleUserInfoApiEndpoint = "https://www.googleapis.com/oauth2/v2/userinfo";

    private readonly GoogleClientSettings _googleClientSettings = googleClientOptions.Value;

    public async Task<string> ExchangeCodeForTokenAsync(string code, CancellationToken cancellationToken)
    {
        var requestData = new Dictionary<string, string>
        {
            { "client_id", _googleClientSettings.ClientId },
            { "client_secret", _googleClientSettings.ClientSecret },
            { "code", code },
            { "grant_type", "authorization_code" },
            { "redirect_uri", _googleClientSettings.RedirectUri },
        };

        var response = await httpClient.PostAsync(GoogleAuthApiEndpoint, new FormUrlEncodedContent(requestData), cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            var errorResponse = await response.Content.ReadAsStringAsync(cancellationToken);
            throw new CanNotObtainGoogleAccessTokenException($"Google token exchange fail ed: {errorResponse}");
        }

        var jsonResponse = await response.Content.ReadAsStringAsync(cancellationToken);
        var tokenData = JsonSerializer.Deserialize<GoogleTokenResponse>(jsonResponse);

        return tokenData?.AccessToken;
    }

    public async Task<GoogleUserInfo> GetUserInfoAsync(string accessToken, CancellationToken cancellationToken)
    {
        var request = new HttpRequestMessage(HttpMethod.Get, GoogleUserInfoApiEndpoint);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        var response = await httpClient.SendAsync(request, cancellationToken);
        response.EnsureSuccessStatusCode();

        var jsonResponse = await response.Content.ReadAsStringAsync(cancellationToken);
        return JsonSerializer.Deserialize<GoogleUserInfo>(jsonResponse);
    }
}