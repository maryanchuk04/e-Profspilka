using MediatR;
using Microsoft.EntityFrameworkCore;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.CommandHandlers.Discounts;

public class SearchDiscountCommand(string searchWord) : IRequest<IEnumerable<DiscountDto>>
{
    public string SearchWord { get; } = searchWord;
}

public class SearchDiscountCommandHandler(EProfspilkaContext db)
    : IRequestHandler<SearchDiscountCommand, IEnumerable<DiscountDto>>
{
    public async Task<IEnumerable<DiscountDto>> Handle(SearchDiscountCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(request.SearchWord))
        {
            return await db.Discounts
                .Select(x => new DiscountDto(x))
                .ToListAsync(cancellationToken);
        }

        var discounts = await db.Discounts
            .Where(x => x.Name.Contains(request.SearchWord) || x.Description.Contains(request.SearchWord))
            .Select(x => new DiscountDto(x))
            .ToListAsync(cancellationToken);

        return discounts;
    }
}