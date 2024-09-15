using YeProfspilka.Core.Models;

namespace YeProfspilka.Core.Interfaces;

public interface IPartnersService
{
	Task<IEnumerable<PartnerDto>> GetAllAsync();

	Task<PartnerDto> UpdateAsync(PartnerDto partner);

	Task<PartnerDto> CreateAsync(PartnerDto partner);

	Task DeleteAsync(Guid id);
}