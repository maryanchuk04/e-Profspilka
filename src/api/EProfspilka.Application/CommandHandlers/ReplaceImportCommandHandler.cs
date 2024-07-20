using EProfspilka.Core.Entities;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Role = EProfspilka.Core.Enumerations.Role;

namespace EProfispilka.Application.CommandHandlers;

public class ReplaceImportCommand(string filePath) : IImportCommand
{
    public string FilePath { get; set; } = filePath;
}

public class ReplaceImportCommandHandler(
    EProfspilkaContext db,
    IStudentStoreService studentStoreService,
    IStudentsReader studentsReader, ILogger<ReplaceImportCommandHandler> logger) : IRequestHandler<ReplaceImportCommand, UploadResultModel>
{
    public async Task<UploadResultModel> Handle(ReplaceImportCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Replace starting");
        try
        {
            var students = studentsReader.Read(request.FilePath);
            var updatedUsersCount = 0;

            // Remove StudentStore
            db.StudentsStore.RemoveRange(
                await db.StudentsStore.ToListAsync(cancellationToken));
            logger.LogInformation("Removed all students from Student Store table");
            // Insert new Students
            await db.StudentsStore.AddRangeAsync(students, cancellationToken);
            logger.LogInformation("Inserted new students to Student Store table count = {Count}", students.Count);

            // Update users table information
            foreach (var student in students)
            {
                var user = await db.Users
                    .Include(x => x.UserRoles)
                    .ThenInclude(x => x.Role)
                    .SingleOrDefaultAsync(x => x.Email == student.Email, cancellationToken);

                if (user == null)
                {
                    logger.LogInformation("Skip user = {Email}", student.Email);
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
                        logger.LogInformation("Dont Have a Member Role {Email}", user.Email);
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
                logger.LogInformation("Update user information for {Email}", user.Email);
                db.Users.Update(user);
                await db.SaveChangesAsync(cancellationToken);
            }


            logger.LogInformation("Replace finished");
            return new UploadResultModel(true,
                students.Count,
                "Успішно завантажено нових користувачів",
                students.Count - updatedUsersCount,
                updatedUsersCount);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Replace finished with ERROR");
            return new UploadResultModel(false, 0, "Щось пішло не так!");
        }
    }
}