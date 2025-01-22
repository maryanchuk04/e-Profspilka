using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.CommandHandlers;

public class GetUserByIdCommand(Guid id) : IRequest<UserMatchingStoreModel>
{
    public Guid Id { get; set; } = id;
}

public class GetStudentUserByIdCommandHandler(
    EProfspilkaContext db,
    ILogger<GenerateDiscountCodeCommandHandler> logger,
    IRoleService roleService)
    : IRequestHandler<GetUserByIdCommand, UserMatchingStoreModel>
{
    private const string DefaultImage =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

    public async Task<UserMatchingStoreModel> Handle(GetUserByIdCommand request, CancellationToken cancellationToken)
    {
        var user = await db.Users
            .AsNoTracking()
            .AsSplitQuery()
            .Include(u => u.Image)
            .Include(u => u.UserRoles)
            .ThenInclude(x => x.Role)
            .SingleOrDefaultAsync(u => u.Id == request.Id, cancellationToken);

        if (user is null)
        {
            logger.LogWarning("Student store user was not found with id = {id}", request.Id);
            throw new NotFoundException(nameof(User), request.Id);
        }

        return new UserMatchingStoreModel()
        {
            Email = user.Email,
            FullName = user.FullName,
            Avatar = user?.Image.ImageUrl ?? DefaultImage,
            Course = user?.Course ?? user.Course,
            Facultet = user?.Faculty ?? user.Faculty,
            //Role = user == null ? null : roleService.RoleResolver(user.UserRole),
            Id = user?.Id ?? user.Id,
        };
    }
}
