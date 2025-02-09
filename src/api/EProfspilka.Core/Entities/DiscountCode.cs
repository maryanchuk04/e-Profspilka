using EProfspilka.Core.Entities.Base;

namespace EProfspilka.Core.Entities;

public class DiscountCode : BaseEntity
{
    public Guid DiscountId { get; set; }

    public Discount Discount { get; set; }

    public Guid UserId { get; set; }

    public User User { get; set; }

    public bool IsActive { get; set; }

    public Guid Code { get; set; }

    public DateTime ActivateTimeUtc { get; set; }

    public DateTime DeactivateTimeUtc { get; set; }
}