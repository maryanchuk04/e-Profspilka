using EProfspilka.Core.Entities;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EProfspilka.Application.CommandHandlers.Discounts;

public class GetUserDiscountsCommand(Guid userId) : IRequest<IList<DiscountDto>>
{
    public Guid UserId { get; set; } = userId;
}

public class GetUserDiscountsCommandHandler(EProfspilkaContext db) : IRequestHandler<GetUserDiscountsCommand, IList<DiscountDto>>
{
    public async Task<IList<DiscountDto>> Handle(GetUserDiscountsCommand request, CancellationToken cancellationToken)
    {
        var user = await db.Users
            .Include(u => u.UserRoles)
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken: cancellationToken);

        if (user is null)
            throw new NotFoundException(nameof(User), request.UserId);

        var discounts = await db.UserDiscounts
            .AsNoTracking()
            .AsSplitQuery()
            .Include(ud => ud.Discount)
            .Where(ud => ud.UserId == request.UserId && ud.IsAvailable && ud.Discount.State == DiscountState.Active)
            .Select(ud => ud.Discount)
            .ToListAsync(cancellationToken);

        return discounts.Select(d => new DiscountDto(d)).ToList();
    }
}