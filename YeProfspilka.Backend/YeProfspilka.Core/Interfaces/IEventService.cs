using YeProfspilka.Core.Models;

namespace YeProfspilka.Core.Interfaces;

public interface IEventService
{
	Task<EventDto> Create(EventDto eventDto);

	Task Delete(Guid id);

	Task Update(EventDto eventDto);

	Task<IEnumerable<EventDto>> Get();

	Task<EventDto> Get(Guid id);
}