using EProfspilka.Core.Enumerations;

namespace EProfspilka.Core.Models;

public class UserDto
{
	public Guid Id { get; set; }

	public string FullName { get; set; }

	public string Email { get; set; }

	public string Status { get; set; }

	public string Avatar { get; set; }

	public string Facultet { get; set; }

	public int Course { get; set; }

	public Role Role { get; set; }

	public IEnumerable<DiscountDto> Discounts { get; set; } = Enumerable.Empty<DiscountDto>();
}