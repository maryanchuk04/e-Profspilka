namespace EProfspilka.Core.Models;

public class PartnerDto
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string WebSiteUrl { get; set; }

    public string Image { get; set; }

    public List<DiscountDto> Discounts { get; set; }
}