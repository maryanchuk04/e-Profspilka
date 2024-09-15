using YeProfspilka.Core.Entities.Base;

namespace YeProfspilka.Core.Entities;

public class Partner : BaseEntity
{
	public string MainText { get; set; }

	public string SubText { get; set; }

	public string SubTextLink { get; set; }

	public Image Image { get; set; }
}