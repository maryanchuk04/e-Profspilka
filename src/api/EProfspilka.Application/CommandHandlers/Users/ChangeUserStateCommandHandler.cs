using EProfspilka.Core;
using EProfspilka.Core.Responses;
using EProfspilka.Db.EF;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EProfspilka.Application.CommandHandlers.Users;

public class ChangeUserStateCommand(Guid userId, bool newStateActive) : IRequest<OperationResponse>
{
    public Guid UserId { get; set; } = userId;
    public bool NewStateActive { get; set; } = newStateActive;
}

public class ChangeUserStateCommandHandler(EProfspilkaContext db)
    : IRequestHandler<ChangeUserStateCommand, OperationResponse>
{
    public async Task<OperationResponse> Handle(ChangeUserStateCommand request, CancellationToken cancellationToken)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == request.UserId,
            cancellationToken: cancellationToken);

        if (user == null)
            return OperationResponse.CreateError(ErrorCodes.UserNotFoundError);

        user.IsActive = request.NewStateActive;

        await db.SaveChangesAsync(cancellationToken);
        return OperationResponse.CreateSuccess();
    }
}