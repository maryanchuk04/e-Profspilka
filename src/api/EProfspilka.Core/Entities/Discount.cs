using EProfspilka.Core.Entities.Base;
using EProfspilka.Core.Enumerations;

namespace EProfspilka.Core.Entities;

public enum DiscountState
{
    Active = 1,
    InActive = 2,
}

public class Discount : BaseEntity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public DiscountType DiscountType { get; set; }

    public DiscountAccessType AccessTypes { get; set; }

    public string PromoCode { get; set; }
    public Guid? BarCodeImageId { get; set; }
    public Image BarCodeImage { get; set; }

    public DiscountState State { get; set; }
}