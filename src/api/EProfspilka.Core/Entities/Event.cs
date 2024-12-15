using EProfspilka.Core.Entities.Base;
using EProfspilka.Core.Enumerations;

namespace EProfspilka.Core.Entities;

public class Event : BaseEntity
{
	public string Title { get; set; }

	public DateTime Date { get; set; }

	public Status Status { get; set; }

	public ICollection<EventImage> EventImages { get; set; }

	public string Description { get; set; }

	public string ShortDescription { get; set; }
}