using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;
using Role = EProfspilka.Core.Enumerations.Role;

namespace EProfspilka.Application.Services;

public class UserService(EProfspilkaContext dbContext, ISecurityContext securityContext, IMapper mapper)
    : IUserServices
{
    public async Task<UserDto> GetCurrentUser()
    {
        var userId = securityContext.GetCurrentUserId();

        var user = await dbContext.Users
            .Include(x => x.Image)
            .Include(x => x.UserRoles)
            .ThenInclude(x => x.Role)
            .SingleOrDefaultAsync(x => x.Id == userId);

        return mapper.Map<UserDto>(user);
    }

    public async Task<IEnumerable<UserDto>> GetUsers()
    {
        var users = await dbContext.Users
            .Include(x => x.UserRoles)
            .Include(x => x.Image)
            .ToListAsync();

        return mapper.Map<IEnumerable<UserDto>>(users);
    }

    public async Task<bool> UserIsExist(string email)
    {
        return await dbContext.Users.AnyAsync(x => x.Email == email);
    }

    public async Task<UserDto> UpdateUser(Guid id, string facultet, int course, Role role)
    {
        var user = await dbContext.Users
            .Include(x => x.UserRoles)
            .ThenInclude(x => x.Role)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (user is null)
        {
            throw new NotFoundException(nameof(User), id);
        }

        user.Faculty = facultet;
        user.Course = course;

        if (user.UserRoles.Select(x => x.Id).Contains(role))
        {
            var roles = user.UserRoles.Select(x => x.Id).ToList();
            // Sort list by value of enum
            roles.Sort();
            var maxRole = roles.Max();

            if(role < maxRole)
            {
                for (var i = roles.IndexOf(maxRole); i < roles.Count; i++)
                {
                    user.UserRoles.Remove(user.UserRoles.Single(x => x.Id == roles[i]));
                }
            }

            await dbContext.SaveChangesAsync();
            return mapper.Map<UserDto>(user);
        }



        if (role == Role.NotVerified)
        {
            user.UserRoles.Clear();
            user.UserRoles.Add(new UserRole
            {
                Id = Role.NotVerified
            });

            dbContext.Users.Update(user);

            await dbContext.SaveChangesAsync();

            return mapper.Map<UserDto>(user);
        }

        if (user.UserRoles.Select(x => x.Id).Contains(Role.NotVerified))
        {
            var notVerified =
                await dbContext.UserRoles.FirstAsync(x => x.UserId == user.Id && x.Id == Role.NotVerified);
            user.UserRoles.Remove(notVerified);
        }

        user.UserRoles.Add(new UserRole
        {
            Id = role
        });

        dbContext.Users.Update(user);
        await dbContext.SaveChangesAsync();

        return mapper.Map<UserDto>(user);
    }
}