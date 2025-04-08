using EProfspilka.Core;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Responses;
using EProfspilka.Db.EF;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Role = EProfspilka.Core.Enumerations.Role;

namespace EProfspilka.Application.CommandHandlers.UserManagement;

public class AssignRoleForUserCommand(Guid userId, Role role) : IRequest<OperationResponse>
{
    public Guid UserId { get; set; } = userId;
    public Role Role { get; set; } = role;
}

public class AssignRoleForUserCommandHandler(EProfspilkaContext db) : IRequestHandler<AssignRoleForUserCommand, OperationResponse>
{
    public async Task<OperationResponse> Handle(AssignRoleForUserCommand request, CancellationToken cancellationToken)
    {
        var result = new OperationResponse();

        var user = await db.Users
            .Include(u => u.UserRoles)
            .ThenInclude(r => r.Role)
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken: cancellationToken);

        if (user == null)
        {
            result.Success = false;
            result.ErrorCode = ErrorCodes.UserNotFoundError;

            return result;
        }

        var userHasRole = user.UserRoles.Any(ur => ur.RoleId == request.Role);

        if (userHasRole)
        {
            result.Success = false;
            result.ErrorCode = ErrorCodes.RoleAlreadyAssignedForUser;

            return result;
        }

        user.UserRoles.Add(new UserRole()
        {
            RoleId = request.Role,
            UserId = user.Id,
            CreatedAtUtc = DateTime.UtcNow,
        });

        db.Users.Update(user);
        await db.SaveChangesAsync(cancellationToken);

        return result;
    }
}