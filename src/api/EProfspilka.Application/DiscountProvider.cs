using System.Linq.Expressions;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Enumerations;
using EProfspilka.Db.EF;
using Microsoft.EntityFrameworkCore;
using Role = EProfspilka.Core.Enumerations.Role;

namespace EProfspilka.Application;

public interface IDiscountProvider
{
    Task<IList<Guid>> GetDiscountsByRoleAsync(
        Role role,
        bool includeOneTimeDiscounts = true,
        CancellationToken cancellationToken = default);
}

public class DiscountProvider(EProfspilkaContext db) : IDiscountProvider
{
    public async Task<IList<Guid>> GetDiscountsByRoleAsync(
        Role role,
        bool includeOneTimeDiscounts = true,
        CancellationToken cancellationToken = default)
    {
        if (role == Role.NotVerified)
            return [];

        var discountTypes = new HashSet<DiscountType> { DiscountType.AvailableForAll };

        if (role >= Role.Member)
            discountTypes.Add(DiscountType.AvailableForMembers);

        if (includeOneTimeDiscounts)
        {
            if (role >= Role.Member)
            {
                discountTypes.Add(DiscountType.OneTimeForAll);
                discountTypes.Add(DiscountType.OneTimeForMembers);
            }
            else
            {
                discountTypes.Add(DiscountType.OneTimeForAll);
            }
        }
        
        return await db.Discounts
            .Where(d => discountTypes.Contains(d.DiscountType))
            .Select(d => d.Id)
            .ToListAsync(cancellationToken);
    }
}