namespace YeProfspilka.Backend.ViewModels;

public class EventViewModel
{
	public string Title { get; set; }

	public string Description { get; set; }

	public DateTime? Date { get; set; }

	public IEnumerable<string> Images { get; set; }

	public string ShortDescription { get; set; }
}