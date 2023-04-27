namespace YeProfspilka.Core.Models;

public class DiscountDto
{
	public Guid Id { get; set; }

	public string Name { get; set; }

	public string CodeWord { get; set; }

	public string? Description { get; set; }

	public bool IsOpen { get; set; }
}