using EProfspilka.Core.Entities.Base;

namespace EProfspilka.Core.Entities;

public class Mark : BaseEntity
{
	public string Name { get; set; }

	public string Text { get; set; }

	public string SubText { get; set; }
}