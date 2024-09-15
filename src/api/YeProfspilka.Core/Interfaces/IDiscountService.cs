using YeProfspilka.Core.Models;

namespace YeProfspilka.Core.Interfaces;

public interface IDiscountService
{
    Task<DiscountDto> CreateAsync(DiscountDto discountDto);

    Task<DiscountDto> UpdateAsync(DiscountDto discountDto);

    Task DeleteAsync(Guid id);

    Task<DiscountDto> GetByIdAsync(Guid id);

    Task<IEnumerable<DiscountDto>> GetAsync();
}