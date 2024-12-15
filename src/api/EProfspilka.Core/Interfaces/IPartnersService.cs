using EProfspilka.Core.Models;

namespace EProfspilka.Core.Interfaces;

public interface IPartnersService
{
	Task<IEnumerable<PartnerDto>> GetAllAsync();

	Task<PartnerDto> UpdateAsync(PartnerDto partner);

	Task<PartnerDto> CreateAsync(PartnerDto partner);

	Task DeleteAsync(Guid id);
}