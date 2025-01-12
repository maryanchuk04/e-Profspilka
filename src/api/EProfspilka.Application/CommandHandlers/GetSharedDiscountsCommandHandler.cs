using MediatR;
using Microsoft.EntityFrameworkCore;
using EProfspilka.Core.Enumerations;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.CommandHandlers;

public class GetSharedDiscountCommand : IRequest<IEnumerable<DiscountDto>>
{
}

public class GetSharedDiscountsCommandHandler(EProfspilkaContext db)
    : IRequestHandler<GetSharedDiscountCommand, IEnumerable<DiscountDto>>
{
    public async Task<IEnumerable<DiscountDto>> Handle(GetSharedDiscountCommand request, CancellationToken cancellationToken)
    {
        return await db.Discounts
            .Where(d => d.DiscountType == DiscountType.AvailableForAll)
            .Select(x => new DiscountDto
            {
                Id = x.Id,
                Name = x.Name,
                WithBarCode = x.WithBarCode,
                WithQrCode = x.WithQrCode,
                BarCodeImage = x.BarCodeImage == null ? null : x.BarCodeImage.ImageUrl,
                Description = x.Description,
                DiscountType = x.DiscountType,
            })
            .ToListAsync(cancellationToken);
    }
}