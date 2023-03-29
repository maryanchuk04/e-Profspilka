namespace YeProfspilka.Core.Models;

public class EventDto
{
	public Guid Id { get; set; }

	public string Title { get; set; }

	public string Description { get; set; }

	public DateTime? Date { get; set; }

	public IEnumerable<string> ImagesUrl { get; set; }
}