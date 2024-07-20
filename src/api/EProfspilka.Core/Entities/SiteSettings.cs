using EProfspilka.Core.Entities.Base;

namespace EProfspilka.Core.Entities;

public class SiteSettings : BaseEntity
{
    public bool IsSiteOnMaintenance { get; set; }
}
