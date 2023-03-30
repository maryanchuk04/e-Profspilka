using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Db.EF;
using Role = YeProfspilka.Core.Enumerations.Role;

namespace YeProfspilka.Application.Services;

public class StudentStoreService : IStudentStoreService
{
	private readonly AppDbContext _dbContext;

	public StudentStoreService(AppDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task<bool> IsStudent(string email)
	{
		return await _dbContext.StudentsStore.AnyAsync(x => x.Email == email);
	}

	public async Task MappingUser(User user)
	{
		var stud = await _dbContext.StudentsStore.FirstOrDefaultAsync(x => x.Email == user.Email);

		if (stud == null)
		{
			throw new NotFoundException(nameof(User), user.Email);
		}

		if (stud.IsPaidDues)
		{
			user.UserRoles.Add(new UserRole
			{
				RoleId = Role.MemberProfspilka
			});
		}
	}
}