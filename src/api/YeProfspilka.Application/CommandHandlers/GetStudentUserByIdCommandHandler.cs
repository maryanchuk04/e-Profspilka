using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.CommandHandlers;

public class GetStudentUserByIdCommand(Guid id) : IRequest<UserMatchingStoreModel>
{
    public Guid Id { get; set; } = id;
}

public class GetStudentUserByIdCommandHandler(
    YeProfspilkaContext db,
    ILogger<GenerateDiscountCodeCommandHandler> logger,
    IRoleService roleService)
    : IRequestHandler<GetStudentUserByIdCommand, UserMatchingStoreModel>
{
    private const string DefaultImage =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

    public async Task<UserMatchingStoreModel> Handle(GetStudentUserByIdCommand request, CancellationToken cancellationToken)
    {
        var storeUser = await db.StudentsStore.SingleOrDefaultAsync(u => u.Id == request.Id, cancellationToken);

        if (storeUser is null)
        {
            logger.LogWarning("Student store user was not found with id = {id}", request.Id);
            throw new NotFoundException(nameof(StudentStore), request.Id);
        }

        var user = await db.Users
            .Include(u => u.Image)
            .Include(u => u.UserRoles)
            .SingleOrDefaultAsync(u => u.Email == storeUser.Email, cancellationToken);

        if (user is null)
        {
            logger.LogInformation("User not found with email = {email}, so user is not activated", storeUser.Email);
        }

        return new UserMatchingStoreModel()
        {
            Email = storeUser.Email,
            FullName = storeUser.FullName,
            Avatar = user?.Image.ImageUrl ?? DefaultImage,
            IsMemberProf = storeUser.IsMemberProf,
            Course = user?.Course ?? storeUser.Course,
            Facultet = user?.Facultet ?? storeUser.Facultet,
            Role = user == null ? null : roleService.RoleResolver(user.UserRoles),
            Id = user?.Id ?? storeUser.Id,
        };
    }
}
