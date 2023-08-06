using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;
using Role = YeProfspilka.Core.Enumerations.Role;

namespace YeProfspilka.Application.CommandHandlers;

public class ReplaceImportCommand : IImportCommand
{
    public ReplaceImportCommand(string filePath)
    {
        FilePath = filePath;
    }

    public string FilePath { get; set; }
}

public class ReplaceImportCommandHandler : IRequestHandler<ReplaceImportCommand, UploadResultModel>
{
    private readonly YeProfspilkaContext _db;
    private readonly IStudentStoreService _studentStoreService;
    private readonly IStudentsReader _studentsReader;
    private readonly ILogger<ReplaceImportCommandHandler> _logger;

    public ReplaceImportCommandHandler(
        YeProfspilkaContext db,
        IStudentStoreService studentStoreService,
        IStudentsReader studentsReader, ILogger<ReplaceImportCommandHandler> logger)
    {
        _db = db;
        _studentStoreService = studentStoreService;
        _studentsReader = studentsReader;
        _logger = logger;
    }

    public async Task<UploadResultModel> Handle(ReplaceImportCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Replace starting");
        try
        {
            var students = _studentsReader.Read(request.FilePath);
            var updatedUsersCount = 0;

            // Remove StudentStore
            _db.StudentsStore.RemoveRange(
                await _db.StudentsStore.ToListAsync(cancellationToken));
            _logger.LogInformation("Removed all students from Student Store table");
            // Insert new Students
            await _db.StudentsStore.AddRangeAsync(students, cancellationToken);
            _logger.LogInformation("Inserted new students to Student Store table count = {Count}", students.Count);

            // Update users table information
            foreach (var student in students)
            {
                var user = await _db.Users
                    .Include(x => x.UserRoles)
                    .ThenInclude(x => x.Role)
                    .SingleOrDefaultAsync(x => x.Email == student.Email, cancellationToken);

                if (user == null)
                {
                    _logger.LogInformation("Skip user = {Email}", student.Email);
                    // Skip user because he is not authorized yet
                    continue;
                }

                updatedUsersCount++;
                user.Course = student.Course;
                user.Facultet = student.Facultet;

                if (student.IsMemberProf)
                {
                    if (user.UserRoles.FirstOrDefault(x => x.RoleId == Role.MemberProfspilka) == null)
                    {
                        _logger.LogInformation("Dont Have a Member Role {Email}", user.Email);
                        user.UserRoles.Add(new UserRole { RoleId = Role.MemberProfspilka, UserId = user.Id });
                    }

                    // Else do nothing because user already have this role
                }
                else
                {
                    // Remove all existing roles
                    foreach (var userRole in user.UserRoles)
                    {
                        user.UserRoles.Remove(userRole);
                    }

                    // Add student role
                    user.UserRoles.Add(new UserRole { RoleId = Role.Student, UserId = user.Id });
                }
                _logger.LogInformation("Update user information for {Email}", user.Email);
                _db.Users.Update(user);
                await _db.SaveChangesAsync(cancellationToken);
            }


            _logger.LogInformation("Replace finished");
            return new UploadResultModel(true,
                students.Count,
                "Успішно завантажено нових користувачів",
                students.Count - updatedUsersCount,
                updatedUsersCount);
        }
        catch (Exception e)
        {
            _logger.LogError(e,"Replace finished with ERROR");
            return new UploadResultModel(false, 0, "Щось пішло не так!");
        }
    }
}