using YeProfspilka.Core.Entities.Base;
using YeProfspilka.Core.Enumerations;

namespace YeProfspilka.Core.Entities;

public class Event : BaseEntity
{
	public string Title { get; set; }

	public DateTime Date { get; set; }

	public Status Status { get; set; }

	public ICollection<EventImage> EventImages { get; set; }

	public string Description { get; set; }
}