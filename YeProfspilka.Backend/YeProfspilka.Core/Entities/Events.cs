using YeProfspilka.Core.Entities.Base;

namespace YeProfspilka.Core.Entities;

public class Event : BaseEntity
{
	public string Title { get; set; }

	public DateTime Date { get; set; }

	public ICollection<EventImage> EventImages { get; set; }

	public string Description { get; set; }
}