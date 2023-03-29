using YeProfspilka.Core.Models;

namespace YeProfspilka.Core.Interfaces;

public interface IEventService
{
	Task<Guid> Create(EventDto eventDto);

	Task Delete(Guid id);

	Task Update(EventDto eventDto);
}