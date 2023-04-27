using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;
using OfficeOpenXml;
using Role = YeProfspilka.Core.Enumerations.Role;

namespace YeProfspilka.Application.Services;

public class StudentStoreService : IStudentStoreService
{
	private readonly AppDbContext _dbContext;

	private const string DefaultImage =
		"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

	public StudentStoreService(AppDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task<bool> IsStudent(string email)
	{
		return await _dbContext.StudentsStore.AnyAsync(x => x.Email == email);
	}

	public async Task<UploadResultModel> UploadUsers(string filePath, bool isOverrideMethod)
	{
		var students = new List<StudentStore>();
		var fileInfo = new FileInfo(filePath);
		try
		{
			ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
			using (var package = new ExcelPackage(fileInfo))
			{
				var worksheet = package.Workbook.Worksheets[0]; // assuming the first worksheet is the one you want to read

				for (var row = 1; row <= worksheet.Dimension.End.Row; row++) // starting from row 2, assuming row 1 contains headers
				{
					students.Add(new StudentStore()
					{
						FullName = worksheet.Cells[row, 1].Value.ToString() ?? string.Empty,
						Email = worksheet.Cells[row, 2].Value.ToString() ?? string.Empty,
						Facultet = worksheet.Cells[row, 3].Value.ToString() ?? string.Empty,
						Course = int.Parse(worksheet.Cells[row, 4].Value.ToString() ?? "1"),
						IsPaidDues = bool.Parse(worksheet.Cells[row, 5].Value.ToString() ?? "0"),
					});
				}
			}
			var (newUsers, updatedUsers) = await MappingUsers(students, isOverrideMethod);
			await _dbContext.SaveChangesAsync();

			return new UploadResultModel(true, students.Count, "Дані завантажено успішно", newUsers, updatedUsers);
		}
		catch (Exception e)
		{
			return new UploadResultModel(false, 0, "Щось пішло не так!");
		}
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
				RoleId = Role.MemberProfspilka,
				UserId = user.Id
			});
		}
	}

	public async Task<IEnumerable<UserMatchingStoreModel>> GetAllUsers()
	{
		var storeUsers = await _dbContext.StudentsStore.ToListAsync();
		var activeUsers = await _dbContext.Users
			.Include(x => x.Image)
			.Include(x => x.UserRoles)
			.ThenInclude(x => x.Role)
			.ToListAsync();

		var finalArray = new List<UserMatchingStoreModel>();

		foreach (var storeUser in storeUsers)
		{
			var matchingUser = activeUsers.FirstOrDefault(x => x.Email == storeUser.Email);
			if (matchingUser is not null)
			{
				finalArray.Add(new UserMatchingStoreModel()
				{
					Id = matchingUser.Id,
					Avatar = matchingUser.Image.ImageUrl,
					FullName = matchingUser.FullName,
					Course = matchingUser.Course ?? 1,
					Facultet = matchingUser.Facultet ?? "",
					Email = matchingUser.Email,
					Role = RoleResolver(matchingUser.UserRoles)
				});
			}
			else
			{
				finalArray.Add(new UserMatchingStoreModel()
				{
					Id = storeUser.Id,
					Avatar = DefaultImage,
					FullName = storeUser.FullName,
					Course = storeUser.Course,
					Facultet = storeUser.Facultet,
					Email = storeUser.Email
				});
			}
		}

		return finalArray;
	}

	private async Task<(int, int)> MappingUsers(
		IEnumerable<StudentStore> incomingStudents,
		bool isOverrideMethod)
	{
		var dbUsers = await _dbContext.StudentsStore.ToListAsync();
		var newUsers = 0;
		var updatedUsers = 0;

		if (isOverrideMethod)
		{
			// user data will be override.
			foreach (var incomingStudent in incomingStudents)
			{
				if (dbUsers.Select(x => x.Email).Contains(incomingStudent.Email))
				{
					var existingUser = dbUsers.First(x => x.Email == incomingStudent.Email);
					existingUser.Course = incomingStudent.Course;
					existingUser.Facultet = incomingStudent.Facultet;
					existingUser.FullName = incomingStudent.FullName;
					existingUser.IsPaidDues = incomingStudent.IsPaidDues;
					_dbContext.StudentsStore.Update(existingUser);
					updatedUsers++;
				}
				else
				{
					await _dbContext.StudentsStore.AddAsync(incomingStudent);
					newUsers++;
				}
			}

			await _dbContext.SaveChangesAsync();

			return (newUsers, updatedUsers);
		}

		foreach (var incomingStudent in incomingStudents)
		{
			if (dbUsers.Select(x => x.Email).Contains(incomingStudent.Email))
			{
				continue;
			}

			await _dbContext.StudentsStore.AddAsync(incomingStudent);
			newUsers++;
		}

		await _dbContext.SaveChangesAsync();

		return (newUsers, updatedUsers);
	}

	private Role RoleResolver(IEnumerable<UserRole> userRoles)
	{
		var userRolesEnum = userRoles.Select(x => x.RoleId).ToList();

		if (userRolesEnum.Contains(Role.Admin))
			return Role.Admin;

		if (userRolesEnum.Contains(Role.Moderator))
			return Role.Moderator;

		if (userRolesEnum.Contains(Role.MemberProfspilka))
			return Role.MemberProfspilka;

		return userRolesEnum.Contains(Role.Student) ? Role.Student : Role.NotVerified;
	}
}