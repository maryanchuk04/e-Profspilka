using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.CommandHandlers;

public class GetStudentUserByIdCommand : IRequest<UserMatchingStoreModel>
{
    public GetStudentUserByIdCommand(Guid id)
    {
        Id = id;
    }

    public Guid Id { get; set; }
}

public class GetStudentUserByIdCommandHandler
    : IRequestHandler<GetStudentUserByIdCommand, UserMatchingStoreModel>
{
    private const string DefaultImage =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
    private readonly YeProfspilkaContext _db;
    private readonly IRoleService _roleService;
    private readonly ILogger<GenerateDiscountCodeCommandHandler> _logger;

    public GetStudentUserByIdCommandHandler(
        YeProfspilkaContext db,
        ILogger<GenerateDiscountCodeCommandHandler> logger,
        IRoleService roleService)
    {
        _db = db;
        _logger = logger;
        _roleService = roleService;
    }

    public async Task<UserMatchingStoreModel> Handle(GetStudentUserByIdCommand request, CancellationToken cancellationToken)
    {
        var storeUser = await _db.StudentsStore.SingleOrDefaultAsync(u => u.Id == request.Id, cancellationToken);

        if (storeUser is null)
        {
            _logger.LogWarning("Student store user was not found with id = {id}", request.Id);
            throw new NotFoundException(nameof(StudentStore), request.Id);
        }

        var user = await _db.Users
            .Include(u => u.Image)
            .Include(u => u.UserRoles)
            .SingleOrDefaultAsync(u => u.Email == storeUser.Email, cancellationToken);

        if (user is null)
        {
            _logger.LogInformation("User not found with email = {email}, so user is not activated", storeUser.Email);
        }

        return new UserMatchingStoreModel()
        {
            Email = storeUser.Email,
            FullName = storeUser.FullName,
            Avatar = user?.Image.ImageUrl ?? DefaultImage,
            IsMemberProf = storeUser.IsMemberProf,
            Course = user?.Course ?? storeUser.Course,
            Facultet = user?.Facultet ?? storeUser.Facultet,
            Role = user == null ? null : _roleService.RoleResolver(user.UserRoles),
            Id = user?.Id ?? storeUser.Id,
        };
    }
}
