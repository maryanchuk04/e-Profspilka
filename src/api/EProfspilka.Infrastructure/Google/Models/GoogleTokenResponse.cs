using System.Text.Json.Serialization;

namespace EProfspilka.Infrastructure.Google.Models;

public class GoogleTokenResponse
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; }

    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }
}