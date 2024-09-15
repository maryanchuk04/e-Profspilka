using YeProfspilka.Core.Entities.Base;

namespace YeProfspilka.Core.Entities;

public class SiteSettings : BaseEntity
{
    public bool IsSiteOnMaintenance { get; set; }
}
