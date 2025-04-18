using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using EProfspilka.Application.Configurations;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Interfaces;

namespace EProfspilka.Application.Services;

public class TokenService(JwtConfiguration jwtConfiguration) : ITokenService
{
    public const string ClaimBaseAddress = "https://e-profspilka.com.ua";

    public string GenerateAccessToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfiguration.Key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var claims = GetClaims(user);
        var token = new JwtSecurityToken(
            jwtConfiguration.Issuer,
            jwtConfiguration.Audience,
            claims,
            expires: DateTime.UtcNow.AddHours(12),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public UserToken GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);

        return new UserToken
        {
            Token = Convert.ToBase64String(randomNumber),
            Expires = DateTime.UtcNow.AddDays(7),
            Created = DateTime.UtcNow,
        };
    }

    private static IEnumerable<Claim> GetClaims(User user)
    {
        List<Claim> claims =
        [
            new($"{ClaimBaseAddress}/userId", $"{user.Id}"),
            new($"{ClaimBaseAddress}/fullName", $"{user.FullName}"),
            new($"{ClaimBaseAddress}/faculty", $"{user.Faculty}"),
            new($"{ClaimBaseAddress}/email", $"{user.Email}"),
            new($"{ClaimBaseAddress}/picture", $"{user.Image.ImageUrl}"),
            new($"{ClaimBaseAddress}/isActive", $"{user.IsActive}"),
        ];

        claims.AddRange(user.UserRoles.Select(ur => new Claim(ClaimTypes.Role, ur.RoleId.ToString().ToLower())));
        claims.AddRange(user.UserRoles.Select(ur => new Claim($"{ClaimBaseAddress}/roles", ur.RoleId.ToString().ToLower())));

        return claims;
    }
}