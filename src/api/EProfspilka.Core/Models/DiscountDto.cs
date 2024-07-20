using EProfspilka.Core.Enumerations;

namespace EProfspilka.Core.Models;

public class DiscountDto
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public bool? WithBarCode { get; set; }

    public bool? WithQrCode { get; set; }

    public string? BarCodeImage { get; set; }

    public string? Description { get; set; }

    public DiscountType DiscountType { get; set; }
}