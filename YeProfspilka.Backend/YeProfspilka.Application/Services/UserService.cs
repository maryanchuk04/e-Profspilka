using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.Services;

public class UserService : IUserServices
{
	private readonly AppDbContext _dbContext;
	private readonly ISecurityContext _securityContext;
	private readonly IMapper _mapper;

	public UserService(AppDbContext dbContext, ISecurityContext securityContext, IMapper mapper)
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
			.ThenInclude(x=>x.User)
			.ToListAsync();

		return _mapper.Map<IEnumerable<UserDto>>(users);
	}

	public async Task<bool> UserIsExist(string email)
	{
		return await _dbContext.Users.AnyAsync(x => x.Email == email);
	}
}