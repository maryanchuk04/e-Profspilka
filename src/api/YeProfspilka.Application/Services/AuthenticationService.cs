using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;
using Role = YeProfspilka.Core.Enumerations.Role;

namespace YeProfspilka.Application.Services;

public class AuthenticationService : IAuthenticationService
{
	private readonly YeProfspilkaContext _context;
	private readonly IStudentStoreService _studentStore;
	private readonly ITokenService _tokenService;

	public AuthenticationService(YeProfspilkaContext context, IStudentStoreService studentStore, ITokenService tokenService)
	{
		_context = context;
		_studentStore = studentStore;
		_tokenService = tokenService;
	}

	public async Task<AuthenticateResponseModel> Authenticate(string email)
	{
		var user = _context.Users
			.Include(x => x.UserTokens)
			.Include(x => x.UserRoles)
			.FirstOrDefault(x => x.Email == email);

		if (user == null)
		{
			throw new AuthenticateException($"Користувача з емеллом {email} не існує!");
		}

		var jwtToken = _tokenService.GenerateAccessToken(user);
		var refreshToken = _tokenService.GenerateRefreshToken();

		user.UserTokens.Add(refreshToken);
		await _context.SaveChangesAsync();

		return new AuthenticateResponseModel(jwtToken, refreshToken.Token);
	}

	public async Task<AuthenticateResponseModel> Authenticate(string email, string password)
	{
		throw new NotImplementedException();
	}

	public async Task<AuthenticateResponseModel> Registration(string email, string fullName, string image)
	{
		var user = await CreateUser(email, fullName, image);

		var jwtToken = _tokenService.GenerateAccessToken(user);
		var refreshToken = _tokenService.GenerateRefreshToken();

		user.UserTokens.Add(refreshToken);

		await _context.Users.AddAsync(user);
		await _context.SaveChangesAsync();

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

		if (!await _studentStore.IsStudent(email))
		{
			user.UserRoles.Add(new UserRole
			{
				RoleId = Role.NotVerified,
				UserId = user.Id,
			});
		}
		else
		{
			await _studentStore.MappingUser(user);
		}

		return user;
	}
}