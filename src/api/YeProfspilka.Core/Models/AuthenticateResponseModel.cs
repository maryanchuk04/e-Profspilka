namespace YeProfspilka.Core.Models;

public class AuthenticateResponseModel(string jwtToken, string refreshToken)
{
    public string JwtToken { get; set; } = jwtToken;

    public string RefreshToken { get; set; } = refreshToken;
}