using MediatR;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Enumerations;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.CommandHandlers;

public class GetSharedDiscountCommand : IRequest<IEnumerable<DiscountDto>>
{
}

public class GetSharedDiscountsCommandHandler : IRequestHandler<GetSharedDiscountCommand, IEnumerable<DiscountDto>>
{
    private readonly YeProfspilkaContext _db;

    public GetSharedDiscountsCommandHandler(YeProfspilkaContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<DiscountDto>> Handle(GetSharedDiscountCommand request, CancellationToken cancellationToken)
    {
        return await _db.Discounts
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