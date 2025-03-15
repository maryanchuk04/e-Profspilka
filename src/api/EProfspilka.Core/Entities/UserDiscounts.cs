using EProfspilka.Core.Entities.Base;

namespace EProfspilka.Core.Entities;

public class UserDiscounts : BaseEntity
{
    public Guid UserId { get; set; }
    public virtual User User { get; set; }

    public Guid DiscountId { get; set; }
    public virtual Discount Discount { get; set; }

    public DateTime? UsedLastTimeUtc { get; set; }
    public int UsedCount { get; set; }

    public bool IsPinned { get; set; } = false;
    public bool IsAvailable { get; set; }
}