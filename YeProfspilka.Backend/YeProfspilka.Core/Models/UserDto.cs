namespace YeProfspilka.Core.Models;

public class UserDto
{
	public Guid Id { get; set; }

	public string FullName { get; set; }

	public string Status { get; set; }

	public string Avatar { get; set; }

	public string Facultet { get; set; }

	public int Course { get; set; }

	public IEnumerable<DiscountDto> Discounts { get; set; } = Enumerable.Empty<DiscountDto>();
}