using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;
using EProfspilka.Application.CommandHandlers.Discounts;
using EProfspilka.Core.Responses;

namespace EProfspilka.Application.CommandHandlers;

public class GetUserByIdCommand(Guid id) : IRequest<UserManagementModel>
{
    public Guid Id { get; set; } = id;
}

public class GetStudentUserByIdCommandHandler(
    EProfspilkaContext db,
    ILogger<GenerateDiscountCodeCommandHandler> logger,
    IRoleService roleService)
    : IRequestHandler<GetUserByIdCommand, UserManagementModel>
{
    private const string DefaultImage = "https://i.ibb.co/KjFRZqHf/default-user.webp"; // default user image, hosted on imgbb

    public async Task<UserManagementModel> Handle(GetUserByIdCommand request, CancellationToken cancellationToken)
    {
        var user = await db.Users
            .AsNoTracking()
            .AsSplitQuery()
            .Include(u => u.Image)
            .Include(u => u.UserRoles)
            .ThenInclude(x => x.Role)
            .Include(u => u.UserDiscounts)
            .ThenInclude(x => x.Discount)
            .Select(user => new UserManagementModel
            {
                Email = user.Email,
                FullName = user.FullName,
                Picture = user.Image.ImageUrl ?? DefaultImage,
                Course = user.Course,
                Faculty = user.Faculty,
                LastLoginDateTimeUtc = user.LastLoginDateTimeUtc,
                IsActive = user.IsActive,
                Roles = user.UserRoles.Select(x => x.RoleId).OrderBy(x => x).ToList(),
                Id = user.Id
            })
            .FirstOrDefaultAsync(u => u.Id == request.Id, cancellationToken);

        if (user is null)
        {
            logger.LogWarning("Student store user was not found with id = {id}", request.Id);
            throw new NotFoundException(nameof(User), request.Id);
        }

        return user;
    }
}
