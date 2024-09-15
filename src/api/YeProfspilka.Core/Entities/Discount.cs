using YeProfspilka.Core.Entities.Base;
using YeProfspilka.Core.Enumerations;

namespace YeProfspilka.Core.Entities;

public class Discount : BaseEntity
{
    public string Name { get; set; }

    public bool? WithQrCode { get; set; }

    public bool? WithBarCode { get; set; }

    public Image? BarCodeImage { get; set; }

    public string? Description { get; set; }

    public DiscountType DiscountType { get; set; }
}