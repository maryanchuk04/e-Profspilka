using EProfspilka.Core.Models;

namespace EProfspilka.Core.Interfaces;

public interface IEventService
{
	Task<EventDto> Create(EventDto eventDto);

	Task Delete(Guid id);

	Task<EventDto> Update(EventDto eventDto);

	Task<IEnumerable<EventDto>> Get();

	Task<EventDto> Get(Guid id);
}