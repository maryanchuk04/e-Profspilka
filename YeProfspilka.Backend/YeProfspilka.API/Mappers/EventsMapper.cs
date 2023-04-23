using AutoMapper;
using YeProfspilka.Backend.ViewModels;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Enumerations;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Mappers;

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