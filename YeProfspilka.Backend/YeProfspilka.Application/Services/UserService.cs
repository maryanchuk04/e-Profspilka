using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;
using Role = YeProfspilka.Core.Enumerations.Role;

namespace YeProfspilka.Application.Services;

public class UserService : IUserServices
{
	private readonly YeProfspilkaContext _dbContext;
	private readonly ISecurityContext _securityContext;
	private readonly IMapper _mapper;

	public UserService(YeProfspilkaContext dbContext, ISecurityContext securityContext, IMapper mapper)
	{
		_dbContext = dbContext;
		_securityContext = securityContext;
		_mapper = mapper;
	}

	public async Task<UserDto> GetCurrentUser()
	{
		var userId = _securityContext.GetCurrentUserId();

		var user = await _dbContext.Users
			.Include(x => x.Image)
			.Include(x => x.UserRoles)
			.ThenInclude(x => x.Role)
			.FirstOrDefaultAsync(x => x.Id == userId);

		return _mapper.Map<UserDto>(user);
	}

	public async Task<IEnumerable<UserDto>> GetUsers()
	{
		var users = await _dbContext.Users
			.Include(x => x.UserRoles)
			.Include(x => x.Image)
			.ToListAsync();

		return _mapper.Map<IEnumerable<UserDto>>(users);
	}

	public async Task<bool> UserIsExist(string email)
	{
		return await _dbContext.Users.AnyAsync(x => x.Email == email);
	}

	public async Task<UserDto> UpdateUserRole(Guid id, Role role)
	{
		var user = await _dbContext.Users
			.Include(x => x.UserRoles)
			.ThenInclude(x => x.Role)
			.FirstOrDefaultAsync(x => x.Id == id);

		if (user is null)
		{
			throw new NotFoundException(nameof(User), id);
		}

		if (user.UserRoles.Select(x => x.RoleId).Contains(role))
		{
			return _mapper.Map<UserDto>(user);
		}

		if (role == Role.NotVerified)
		{
			user.UserRoles.Clear();
			user.UserRoles.Add(new UserRole
			{
				RoleId = Role.NotVerified
			});

			_dbContext.Users.Update(user);
			await _dbContext.SaveChangesAsync();

			return _mapper.Map<UserDto>(user);
		}

		if (user.UserRoles.Select(x => x.RoleId).Contains(Role.NotVerified))
		{
			var notVerified =
				await _dbContext.UserRoles.FirstAsync(x => x.UserId == user.Id && x.RoleId == Role.NotVerified);
			user.UserRoles.Remove(notVerified);
		}

		user.UserRoles.Add(new UserRole
		{
			RoleId = role
		});

		_dbContext.Users.Update(user);
		await _dbContext.SaveChangesAsync();

		return _mapper.Map<UserDto>(user);
	}
}