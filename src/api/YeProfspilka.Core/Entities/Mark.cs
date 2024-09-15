using YeProfspilka.Core.Entities.Base;

namespace YeProfspilka.Core.Entities;

public class Mark : BaseEntity
{
	public string Name { get; set; }

	public string Text { get; set; }

	public string SubText { get; set; }
}