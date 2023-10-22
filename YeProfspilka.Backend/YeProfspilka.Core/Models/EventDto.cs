using YeProfspilka.Core.Enumerations;

namespace YeProfspilka.Core.Models;

public class EventDto
{
	public Guid Id { get; set; }

	public string Title { get; set; }

	public string Description { get; set; }

	public DateTime? Date { get; set; }

	public Status Status { get; set; }

	public bool IsPassed { get; set; }

	public string ShortDescription { get; set; }

	public IEnumerable<string> Images { get; set; }
}