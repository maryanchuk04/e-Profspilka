using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Enumerations;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.Services;

public class EventService : IEventService
{
	private readonly AppDbContext _dbContext;
	private readonly IMapper _mapper;

	public EventService(AppDbContext dbContext, IMapper mapper)
	{
		_dbContext = dbContext;
		_mapper = mapper;
	}

	public async Task<EventDto> Create(EventDto eventDto)
	{
		var newEvent = new Event
		{
			Id = Guid.NewGuid(),
			Date = DateTime.Now,
			Title = eventDto.Title,
			Status = Status.Draft,
			Description = eventDto.Description,
			EventImages = new List<EventImage>()
		};

		foreach (var image in eventDto.Images)
		{
			newEvent.EventImages.Add(new EventImage()
			{
				Image = new Image(image),
				EventId = newEvent.Id
			});
		}

		var entry  = await _dbContext.Events.AddAsync(newEvent);
		await _dbContext.SaveChangesAsync();

		eventDto.Id = entry.Entity.Id;

		return eventDto;
	}

	public async Task Delete(Guid id)
	{
		var ev = await _dbContext.Events.FirstOrDefaultAsync(x => x.Id == id);
		if (ev == null)
		{
			throw new NotFoundException(nameof(Event), id);
		}

		_dbContext.Events.Remove(ev);
		await _dbContext.SaveChangesAsync();
	}

	public async Task<EventDto> Update(EventDto eventDto)
	{
		var ev = await _dbContext.Events
			.Include(x => x.EventImages)
			.ThenInclude(x => x.Image)
			.FirstOrDefaultAsync(x => x.Id == eventDto.Id);

		if (ev == null)
		{
			throw new NotFoundException(nameof(Event), eventDto.Id);
		}

		ev.Date = eventDto.Date ?? DateTime.Now;
		ev.Description = eventDto.Description;
		ev.Title = eventDto.Title;
		ev.EventImages.Clear();

		foreach (var url in eventDto.Images.Distinct())
		{
			ev.EventImages.Add(new EventImage()
			{
				EventId = ev.Id,
				Image = new Image(url)
			});
		}

		_dbContext.Events.Update(ev);
		await _dbContext.SaveChangesAsync();

		return _mapper.Map<EventDto>(ev);
	}

	public async Task<IEnumerable<EventDto>> Get()
	{
		var listEvents =  await _dbContext.Events
			.Include(x => x.EventImages)
			.ThenInclude(x => x.Image)
			.ToListAsync();

		return _mapper.Map<IEnumerable<EventDto>>(listEvents) ?? ArraySegment<EventDto>.Empty;
	}

	public async Task<EventDto> Get(Guid id)
	{
		return _mapper.Map<EventDto>(await GetEvent(id));
	}

	private async Task<Event> GetEvent(Guid id)
	{
		var ev = await _dbContext.Events
			.Include(x => x.EventImages)
			.ThenInclude(x => x.Image)
			.FirstOrDefaultAsync(x => x.Id == id);

		if (ev == null)
		{
			throw new NotFoundException(nameof(Event), id);
		}

		return ev;
	}
}