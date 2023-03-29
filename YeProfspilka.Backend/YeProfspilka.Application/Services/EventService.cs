using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.Services;

public class EventService : IEventService
{
	private readonly AppDbContext _dbContext;

	public EventService(AppDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task<Guid> Create(EventDto eventDto)
	{
		throw new NotImplementedException();
	}

	public async Task Delete(Guid id)
	{
		throw new NotImplementedException();
	}

	public async Task Update(EventDto eventDto)
	{
		throw new NotImplementedException();
	}
}