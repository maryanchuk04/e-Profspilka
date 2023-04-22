using YeProfspilka.Core.Models;

namespace YeProfspilka.Core.Interfaces;

public interface IAdvantageService
{
    Task<AdvantageDto> Create(AdvantageDto advantageDto);

    Task<AdvantageDto> Update(AdvantageDto advantageDto);

    Task<AdvantageDto[]> GetAll();

    Task<AdvantageDto> GetById(Guid id);

    Task Delete(Guid id);
}