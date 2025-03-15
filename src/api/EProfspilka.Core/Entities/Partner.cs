using EProfspilka.Core.Entities.Base;

namespace EProfspilka.Core.Entities;

public class Partner : BaseEntity
{
    public string Name { get; set; }

    public string Description { get; set; }

    public string WebSiteUrl { get; set; }

    public Image Image { get; set; }
}