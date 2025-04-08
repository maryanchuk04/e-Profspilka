using EProfspilka.Core.Entities;
using EProfspilka.Core.Enumerations;

namespace EProfspilka.Core.Models;

public class DiscountDto
{
    public DiscountDto() { }

    public DiscountDto(Discount entity)
    {
        Id = entity.Id;
        Name = entity.Name;
        Description = entity.Description;
        DiscountType = entity.DiscountType;

        BarCodeImage = entity.BarCodeImageId.HasValue ? entity.BarCodeImage.ImageUrl : null;
        WithBarCode = entity.AccessTypes.HasFlag(DiscountAccessType.BarCode);
        WithQrCode = entity.AccessTypes.HasFlag(DiscountAccessType.QRCode);
        WithPromoCode = entity.AccessTypes.HasFlag(DiscountAccessType.PromoCode);

        PromoCode = entity.PromoCode;

        if (entity.PartnerId.HasValue)
        {
            var image = entity.Partner?.Image?.ImageUrl;
            var name = entity.Partner?.Name;

            Partner = new DiscountPartnerDto
            {
                Id = entity.PartnerId.Value,
                Image = image,
                Name = name,
            };
        }
    }

	public Guid Id { get; set; }

	public string Name { get; set; }

	public bool? WithBarCode { get; set; }

	public bool? WithQrCode { get; set; }

    public bool? WithPromoCode { get; set; }

	public string BarCodeImage { get; set; }

	public string Description { get; set; }

	public string PromoCode { get; set; }

	public DiscountType DiscountType { get; set; }

    public DiscountPartnerDto Partner { get; set; }
}

public class DiscountPartnerDto
{
    public Guid Id { get; set; }

    public string Image { get; set; }

    public string Name { get; set; }
}
