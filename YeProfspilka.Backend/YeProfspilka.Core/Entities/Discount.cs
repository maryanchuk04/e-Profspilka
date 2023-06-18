using YeProfspilka.Core.Entities.Base;

namespace YeProfspilka.Core.Entities;

public class Discount : BaseEntity
{
    public string Name { get; set; }

    public string? CodeWord { get; set; }

    public string? Description { get; set; }

    public bool IsOpen { get; set; }
}