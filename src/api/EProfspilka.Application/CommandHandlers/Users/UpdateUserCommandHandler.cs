using EProfspilka.Core;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Responses;
using EProfspilka.Db.EF;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Role = EProfspilka.Core.Enumerations.Role;

namespace EProfspilka.Application.CommandHandlers.Users;

public class UpdateUserCommand(UserManagementModel user) : IRequest<OperationResponse>
{
    public UserManagementModel User { get; set; } = user;
}

public class UpdateUserCommandHandler(EProfspilkaContext db) : IRequestHandler<UpdateUserCommand, OperationResponse>
{
    public async Task<OperationResponse> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var user = await db.Users
            .AsSplitQuery()
            .Include(u => u.UserRoles)
            .FirstOrDefaultAsync(u => u.Id == request.User.Id, cancellationToken);

        if (user == null)
            return OperationResponse.CreateError(ErrorCodes.UserNotFoundError);

        if (!string.IsNullOrEmpty(request.User.Faculty))
            user.Faculty = request.User.Faculty;

        if (request.User.Course.HasValue)
            user.Course = request.User.Course.Value;

        var currentRoles = user.UserRoles.Select(ur => ur.RoleId).ToHashSet();

        if (request.User.Roles.Count > 0)
        {
            // if there is a NotVerified role in the list of roles,
            // it means that the user is not verified,
            // and the following roles will not be applied.
            if (request.User.Roles.Contains(Role.NotVerified))
            {
                user.UserRoles.Add(new UserRole
                {
                    RoleId = Role.NotVerified,
                    UserId = user.Id
                });
            }
            else
            {
                foreach (var roleId in request.User.Roles.Where(roleId => !currentRoles.Contains(roleId)))
                {
                    user.UserRoles.Add(new UserRole
                    {
                        RoleId = roleId,
                        UserId = user.Id
                    });
                }
            }
        }
        
        db.Users.Update(user);
        await db.SaveChangesAsync(cancellationToken);
        
        return OperationResponse.CreateSuccess();
    }
}