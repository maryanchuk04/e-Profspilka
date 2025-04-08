using EProfspilka.Core.Entities;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EProfspilka.Application.CommandHandlers.Discounts;

public class GetDiscountByIdCommand(Guid userId, Guid discountId) : IRequest<DiscountDto>
{
    public Guid UserId { get; set; } = userId;
    public Guid DiscountId { get; set; } = discountId;
}

public class GetDiscountByIdCommandHandler(EProfspilkaContext db) : IRequestHandler<GetDiscountByIdCommand, DiscountDto>
{
    public async Task<DiscountDto> Handle(GetDiscountByIdCommand request, CancellationToken cancellationToken)
    {
        var user = await db.Users
            .Include(u => u.UserRoles)
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken: cancellationToken);

        if (user is null)
            throw new NotFoundException(nameof(User), request.UserId);

        var discount = await db.UserDiscounts
            .AsNoTracking()
            .AsSplitQuery()
            .Include(ud => ud.Discount)
            .ThenInclude(d => d.Partner)
            .Where(ud => ud.UserId == request.UserId && ud.IsAvailable && ud.Discount.State == DiscountState.Active && ud.DiscountId == request.DiscountId)
            .Select(ud => ud.Discount)
            .FirstOrDefaultAsync(cancellationToken);

        if (discount == null)
            throw new DiscountNotFoundException(request.DiscountId);

        return new DiscountDto(discount);
    }
}