using MediatR;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.CommandHandlers;

public class SearchDiscountCommand : IRequest<IEnumerable<DiscountDto>>
{
    public SearchDiscountCommand(string searchWord)
    {
        SearchWord = searchWord;
    }

    public string SearchWord { get; }
}

public class SearchDiscountCommandHandler : IRequestHandler<SearchDiscountCommand, IEnumerable<DiscountDto>>
{
    private readonly YeProfspilkaContext _db;

    public SearchDiscountCommandHandler(YeProfspilkaContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<DiscountDto>> Handle(SearchDiscountCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(request.SearchWord))
        {
            return await _db.Discounts
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

        var discounts = await _db.Discounts
            .Where(x => x.Name.Contains(request.SearchWord) || x.Description.Contains(request.SearchWord))
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

        return discounts;
    }
}