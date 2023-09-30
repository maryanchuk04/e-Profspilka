using MediatR;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.CommandHandlers;

public class UploadStudentsCommand : IRequest<UploadResultModel>
{
	public UploadStudentsCommand(string filePath, bool isOverride = true)
	{
		FilePath = filePath;
		IsOverride = isOverride;
	}

	public string FilePath { get; }
	public bool IsOverride { get; }
}

public class UploadStudentsCommandHandler : IRequestHandler<UploadStudentsCommand, UploadResultModel>
{
	private readonly YeProfspilkaContext _db;

	public UploadStudentsCommandHandler(YeProfspilkaContext db)
	{
		_db = db;
	}

	public async Task<UploadResultModel> Handle(UploadStudentsCommand request, CancellationToken cancellationToken)
	{
		var students = new List<Student>();
		var fileInfo = new FileInfo(request.FilePath);
		try
		{
			ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
			using (var package = new ExcelPackage(fileInfo))
			{
				var worksheet = package.Workbook.Worksheets[0];

				for (var row = 1; row <= worksheet.Dimension.End.Row; row++)
				{
					students.Add(new Student
					{
						FullName = worksheet.Cells[row, 1].Value.ToString() ?? string.Empty,
						Email = worksheet.Cells[row, 2].Value.ToString() ?? string.Empty,
						Facultet = worksheet.Cells[row, 3].Value.ToString() ?? string.Empty,
						Course = int.Parse(worksheet.Cells[row, 4].Value.ToString() ?? "1"),
						IsMemberProf = bool.Parse(worksheet.Cells[row, 5].Value.ToString() ?? "0"),
					});
				}
			}

			var (newUsers, updatedUsers) = await MappingUsers(students, request.IsOverride);
			await _db.SaveChangesAsync(cancellationToken);

			return new UploadResultModel(true, students.Count, "Дані завантажено успішно", newUsers, updatedUsers);
		}
		catch (Exception e)
		{
			return new UploadResultModel(false, 0, "Щось пішло не так!");
		}
	}

	private async Task<(int, int)> MappingUsers(
		IEnumerable<Student> incomingStudents,
		bool isOverrideMethod)
	{
		var dbUsers = await _db.Students.ToListAsync();
		var newUsers = 0;
		var updatedUsers = 0;

		if (isOverrideMethod)
		{
			foreach (var incomingStudent in incomingStudents)
			{
				if (dbUsers.Select(x => x.Email).Contains(incomingStudent.Email))
				{
					var existingUser = dbUsers.First(x => x.Email == incomingStudent.Email);
					existingUser.Course = incomingStudent.Course;
					existingUser.Facultet = incomingStudent.Facultet;
					existingUser.FullName = incomingStudent.FullName;
					existingUser.IsMemberProf = incomingStudent.IsMemberProf;
					_db.Students.Update(existingUser);
					updatedUsers++;
				}
				else
				{
					await _db.Students.AddAsync(incomingStudent);
					newUsers++;
				}
			}

			await _db.SaveChangesAsync();

			return (newUsers, updatedUsers);
		}

		foreach (var incomingStudent in incomingStudents)
		{
			if (dbUsers.Select(x => x.Email).Contains(incomingStudent.Email))
			{
				continue;
			}

			await _db.Students.AddAsync(incomingStudent);
			newUsers++;
		}

		await _db.SaveChangesAsync();

		return (newUsers, updatedUsers);
	}
}