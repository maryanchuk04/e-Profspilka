﻿using EProfspilka.Core.Entities;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EProfspilka.Application.CommandHandlers.UserManagement;

public class MergeImportCommand(string filePath) : IImportCommand
{
    public string FilePath { get; set; } = filePath;
}

public class MergeImportCommandHandler(
    EProfspilkaContext db,
    IFileUserReader fileReader,
    ILogger<MergeImportCommandHandler> logger) : IRequestHandler<MergeImportCommand, UploadResultModel>
{
    public async Task<UploadResultModel> Handle(MergeImportCommand request, CancellationToken cancellationToken)
    {
        var newUsers = new List<User>();

        try
        {
            var fileUsers = fileReader.Read(request.FilePath);
            var fileUserEmails = new HashSet<string>(fileUsers.Select(fu => fu.Email));

            db.ChangeTracker.AutoDetectChangesEnabled = false;

            var existingUsersDict = await db.Users
                .AsNoTracking()
                .Where(u => fileUserEmails.Contains(u.Email))
                .ToDictionaryAsync(u => u.Email, u => u, cancellationToken: cancellationToken);

            foreach (var fUser in fileUsers)
            {
                if (existingUsersDict.TryGetValue(fUser.Email, out var existingUser))
                {
                    var userToUpdate = new User
                    {
                        Id = existingUser.Id,
                        FullName = fUser.FullName,
                        Email = fUser.Email,
                        Faculty = fUser.Facultet,
                        Course = fUser.Course,
                    };

                    // Check if user status was updated
                    // And assign new roles if needed
                    //if (fUser.IsMemberProf && !existingUser.UserRoles.Select(x => x.RoleId).Contains(Role.MemberProfspilka))
                    //    userToUpdate.UserRoles.Add(new UserRole() { UserId = userToUpdate.Id, Role = Role.MemberProfspilka });
                    //else
                    //    userToUpdate.UserRoles.Remove(userToUpdate.UserRoles.First(u => u.RoleId == Role.MemberProfspilka));

                    db.Entry(userToUpdate).State = EntityState.Modified;
                }
                else
                {
                    var userId = Guid.NewGuid();

                    var newUser = new User
                    {
                        Id = userId,
                        FullName = fUser.FullName,
                        Email = fUser.Email,
                        Faculty = fUser.Facultet,
                        Course = fUser.Course,
                        //IsActive = true,
                        //UserRoles = GetStudentsRoles(userId, fUser.IsMemberProf),
                    };
                    newUsers.Add(newUser);
                }
            }

            if (newUsers.Any())
                await db.Users.AddRangeAsync(newUsers, cancellationToken);

            await db.SaveChangesAsync(cancellationToken);

            db.ChangeTracker.AutoDetectChangesEnabled = true;

            return new UploadResultModel(true, newUsers.Count, "Операція успішна");
        }
        catch (Exception ex)
        {
            db.ChangeTracker.AutoDetectChangesEnabled = true;

            var message = "An error occurred during importing new users (ReplaceV2)";
            logger.LogError(ex, message);

            return new UploadResultModel(false, 0, message);
        }
    }
}