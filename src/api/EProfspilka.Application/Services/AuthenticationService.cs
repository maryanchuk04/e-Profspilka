using Microsoft.EntityFrameworkCore;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;
using Role = EProfspilka.Core.Enumerations.Role;

namespace EProfspilka.Application.Services;

public class AuthenticationService(
    EProfspilkaContext context,
    ITokenService tokenService)
    : IAuthenticationService
{
    public async Task<AuthenticateResponseModel> AuthenticateAsync(string email, string avatar)
    {
        var user = await context.Users
            .AsNoTracking()
            .AsSplitQuery()
            .Include(x => x.Image)
            .Include(x => x.UserTokens)
            .Include(x => x.UserRoles)
            .ThenInclude(x => x.Role)
            .FirstOrDefaultAsync(x => x.Email == email);

        if (user == null)
            throw new AuthenticateException($"Користувача з емейлом {email} не існує!");

        if (!string.IsNullOrEmpty(avatar))
            user.Image = new Image(avatar);

        var jwtToken = tokenService.GenerateAccessToken(user);
        var refreshToken = tokenService.GenerateRefreshToken();

        user.LastLoginDateTimeUtc = DateTime.UtcNow;
        user.UserTokens.Add(refreshToken);

        context.Users.Update(user);

        await context.SaveChangesAsync();

        return new AuthenticateResponseModel(jwtToken, refreshToken.Token);
    }

    public async Task<AuthenticateResponseModel> Registration(string email, string fullName, string image)
    {
        var user = await CreateOrUpdateUserAsync(email, fullName, image);

        var jwtToken = tokenService.GenerateAccessToken(user);
        var refreshToken = tokenService.GenerateRefreshToken();

        user.UserTokens.Add(refreshToken);
        user.LastLoginDateTimeUtc = DateTime.UtcNow;

        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();

        return new AuthenticateResponseModel(jwtToken, refreshToken.Token);
    }

    private async Task<User> CreateOrUpdateUserAsync(string email, string fullName, string image)
    {
        var user = await context.Users
            .Include(user => user.UserRoles)
            .Include(user => user.Image)
            .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
        
        if (user is not null)
        {
            // update user
            user.FullName = fullName;
            user.Image.ImageUrl = fullName;

            context.Users.Update(user);
            await context.SaveChangesAsync();
            return user;
        }

        user = new User
        {
            Id = Guid.NewGuid(),
            Email = email,
            FullName = fullName,
            Image = new Image(image),
            UserTokens = new List<UserToken>(),
            IsActive = true,
        };

        user.UserRoles.Add(new UserRole { RoleId = Role.Student, UserId = user.Id });

        //if (!await studentStore.IsStudent(email))
        //{
        //    user.UserRoles.Add(new UserRole
        //    {
        //        RoleId = Role.NotVerified,
        //        UserId = user.Id,
        //    });
        //}
        //else
        //{
        //    await studentStore.MappingUser(user);
        //}

        return user;
    }
}