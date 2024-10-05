using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;
using Role = YeProfspilka.Core.Enumerations.Role;

namespace YeProfspilka.Application.Services;

public class AuthenticationService(
    YeProfspilkaContext context,
    IStudentStoreService studentStore,
    ITokenService tokenService)
    : IAuthenticationService
{
    public async Task<AuthenticateResponseModel> Authenticate(string email)
	{
		var user = context.Users
			.Include(x => x.UserTokens)
			.Include(x => x.UserRoles)
			.FirstOrDefault(x => x.Email == email);

		if (user == null)
		{
			throw new AuthenticateException($"Користувача з емеллом {email} не існує!");
		}

		var jwtToken = tokenService.GenerateAccessToken(user);
		var refreshToken = tokenService.GenerateRefreshToken();

		user.UserTokens.Add(refreshToken);
		await context.SaveChangesAsync();

		return new AuthenticateResponseModel(jwtToken, refreshToken.Token);
	}

	public async Task<AuthenticateResponseModel> Authenticate(string email, string password)
	{
		throw new NotImplementedException();
	}

	public async Task<AuthenticateResponseModel> Registration(string email, string fullName, string image)
	{
		var user = await CreateUser(email, fullName, image);

		var jwtToken = tokenService.GenerateAccessToken(user);
		var refreshToken = tokenService.GenerateRefreshToken();

		user.UserTokens.Add(refreshToken);

		await context.Users.AddAsync(user);
		await context.SaveChangesAsync();

		return new AuthenticateResponseModel(jwtToken, refreshToken.Token);
	}

	private async Task<User> CreateUser(string email, string fullName, string image)
	{
		var user = new User
		{
			Id = Guid.NewGuid(),
			Email = email,
			FullName = fullName,
			Image = new Image(image),
			UserRoles = new List<UserRole>(),
			UserTokens = new List<UserToken>(),
		};

		user.UserRoles.Add(new UserRole { RoleId = Role.Student, UserId = user.Id });

		if (!await studentStore.IsStudent(email))
		{
			user.UserRoles.Add(new UserRole
			{
				RoleId = Role.NotVerified,
				UserId = user.Id,
			});
		}
		else
		{
			await studentStore.MappingUser(user);
		}

		return user;
	}
}