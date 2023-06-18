namespace YeProfspilka.Core.Models;

public class DiscountCodeDto
{
    public Guid Id { get; set; }

    public DiscountDto Discount { get; set; }

    public bool IsActive { get; set; }

    public Guid Code { get; set; }

    public DateTime ActivateTimeUtc { get; set; }

    public DateTime DeactivateTimeUtc { get; set; }
}