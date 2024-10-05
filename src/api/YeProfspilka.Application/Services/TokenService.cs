using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using YeProfspilka.Application.Configurations;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Interfaces;

namespace YeProfspilka.Application.Services;

public class TokenService(JwtConfiguration jwtConfiguration) : ITokenService
{
    public string GenerateAccessToken(User user)
	{
		var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfiguration.Key));
		var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
		var claims = GetClaims(user);
		var token = new JwtSecurityToken(
			jwtConfiguration.Issuer,
			jwtConfiguration.Audience,
			claims,
			expires: DateTime.Now.AddHours(6),
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
			Expires = DateTime.Now.AddDays(7),
			Created = DateTime.Now,
		};
	}

	private static IEnumerable<Claim> GetClaims(User user)
	{
		var claims = new List<Claim>();

		claims.Add(new Claim(ClaimTypes.Name, $"{user.Id}"));
		claims.AddRange(user.UserRoles.Select(ur => new Claim(ClaimTypes.Role, ur.RoleId.ToString())));

		return claims;
	}
}