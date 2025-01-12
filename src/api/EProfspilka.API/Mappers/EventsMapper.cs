using AutoMapper;
using EProfspilka.API.ViewModels;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Models;

namespace EProfspilka.API.Mappers;

public class EventsMapper : Profile
{
	public EventsMapper()
	{
		CreateMap<EventDto, Event>();
		CreateMap<EventViewModel, EventDto>();
		CreateMap<Event, EventDto>()
			.ForMember(x => x.IsPassed, opts => opts.MapFrom(x => x.Date > DateTime.Now))
			.ForMember(x => x.Images, opts => opts.MapFrom(x=> MapEventsImages(x.EventImages)));
	}

	private static IEnumerable<string> MapEventsImages(IEnumerable<EventImage> eventImages)
	{
		return eventImages.Select(x => x.Image.ImageUrl);
	}
}