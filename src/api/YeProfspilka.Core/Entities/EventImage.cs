using YeProfspilka.Core.Entities.Base;

namespace YeProfspilka.Core.Entities;

public class EventImage : BaseEntity
{
	public Guid EventId { get; set; }

	public Event Event { get; set; }

	public Guid ImageId { get; set; }

	public Image Image { get; set; }
}