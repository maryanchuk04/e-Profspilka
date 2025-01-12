using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Enumerations;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.Services;

public class EventService(EProfspilkaContext dbContext, IMapper mapper) : IEventService
{
    public async Task<EventDto> Create(EventDto eventDto)
    {
        var newEvent = new Event
        {
            Id = Guid.NewGuid(),
            Date = DateTime.Now,
            Title = eventDto.Title,
            Status = Status.Draft,
            Description = eventDto.Description,
            ShortDescription = eventDto.ShortDescription,
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

        var entry = await dbContext.Events.AddAsync(newEvent);
        await dbContext.SaveChangesAsync();

        eventDto.Id = entry.Entity.Id;

        return eventDto;
    }

    public async Task Delete(Guid id)
    {
        var ev = await dbContext.Events.FirstOrDefaultAsync(x => x.Id == id);
        if (ev == null)
        {
            throw new NotFoundException(nameof(Event), id);
        }

        dbContext.Events.Remove(ev);
        await dbContext.SaveChangesAsync();
    }

    public async Task<EventDto> Update(EventDto eventDto)
    {
        var ev = await dbContext.Events
            .AsSplitQuery()
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
        ev.ShortDescription = eventDto.ShortDescription;
        ev.EventImages.Clear();

        foreach (var url in eventDto.Images.Distinct())
        {
            ev.EventImages.Add(new EventImage()
            {
                EventId = ev.Id,
                Image = new Image(url)
            });
        }

        dbContext.Events.Update(ev);
        await dbContext.SaveChangesAsync();

        return mapper.Map<EventDto>(ev);
    }

    public async Task<IEnumerable<EventDto>> Get()
    {
        var listEvents = await dbContext.Events
            .AsNoTracking()
            .AsSplitQuery()
            .Include(x => x.EventImages)
            .ThenInclude(x => x.Image)
            .ToListAsync();

        return mapper.Map<IEnumerable<EventDto>>(listEvents) ?? ArraySegment<EventDto>.Empty;
    }

    public async Task<EventDto> Get(Guid id)
    {
        return mapper.Map<EventDto>(await GetEvent(id));
    }

    private async Task<Event> GetEvent(Guid id)
    {
        var ev = await dbContext.Events
            .AsNoTracking()
            .AsSplitQuery()
            .Include(x => x.EventImages)
            .ThenInclude(x => x.Image)
            .SingleOrDefaultAsync(x => x.Id == id);

        if (ev == null)
        {
            throw new NotFoundException(nameof(Event), id);
        }

        return ev;
    }
}