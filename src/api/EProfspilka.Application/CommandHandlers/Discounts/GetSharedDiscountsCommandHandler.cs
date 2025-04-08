using MediatR;
using Microsoft.EntityFrameworkCore;
using EProfspilka.Core.Enumerations;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.CommandHandlers.Discounts;

public class GetSharedDiscountCommand : IRequest<IEnumerable<DiscountDto>>
{
}

public class GetSharedDiscountsCommandHandler(EProfspilkaContext db)
    : IRequestHandler<GetSharedDiscountCommand, IEnumerable<DiscountDto>>
{
    public async Task<IEnumerable<DiscountDto>> Handle(GetSharedDiscountCommand request, CancellationToken cancellationToken)
    {
        var discounts = await db.Discounts
            .AsNoTracking()
            .AsSplitQuery()
            .Where(d => d.DiscountType == DiscountType.AvailableForAll)
            .Include(discount => discount.BarCodeImage)
            .Include(d => d.Partner)
            .ToListAsync(cancellationToken);


        return discounts.Select(d => new DiscountDto(d));
    }
}