using EProfspilka.Core;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Responses;
using EProfspilka.Db.EF;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Role = EProfspilka.Core.Enumerations.Role;

namespace EProfspilka.Application.CommandHandlers.Discounts;

public class AssignDiscountsCorrespondingToRoleCommand(Guid userId) : IRequest<OperationResponse>
{
    public Guid UserId { get; } = userId;
}

public class AssignDiscountsCorrespondingToRoleCommandHandler(
    EProfspilkaContext db,
    IDiscountProvider discountProvider,
    ILogger<AssignDiscountsCorrespondingToRoleCommandHandler> logger)
    : IRequestHandler<AssignDiscountsCorrespondingToRoleCommand, OperationResponse>
{
    public async Task<OperationResponse> Handle(AssignDiscountsCorrespondingToRoleCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var user = await db.Users
                .Include(u => u.UserRoles)
                .Include(u => u.UserDiscounts)
                .FirstOrDefaultAsync(user => user.Id == request.UserId, cancellationToken: cancellationToken);

            if (user == null)
                return OperationResponse.CreateError(ErrorCodes.UserNotFoundError);

            var maxUserRole = user.UserRoles.OrderByDescending(r => r.RoleId).FirstOrDefault()?.RoleId ??
                              Role.NotVerified;

            var discountIds =
                await discountProvider.GetDiscountsByRoleAsync(maxUserRole, cancellationToken: cancellationToken);

            user.UserDiscounts ??= new List<UserDiscounts>();

            foreach (var discountId in discountIds)
            {
                if (user.UserDiscounts.Any(d => d.DiscountId == discountId))
                    continue;

                user.UserDiscounts.Add(new UserDiscounts
                {
                    DiscountId = discountId,
                    UserId = user.Id,
                    CreatedDateUtc = DateTime.UtcNow,
                    UpdatedDateUtc = DateTime.UtcNow,
                    UsedCount = 0,
                    IsAvailable = true,
                });
            }

            db.Users.Update(user);
            await db.SaveChangesAsync(cancellationToken);

            return OperationResponse.CreateSuccess();
        }
        catch (Exception e)
        {
            logger.LogError(e, "An error occured while assigning discount to user = {UserId}", request.UserId);
            return OperationResponse.CreateError(e.Message);
        }
    }
}