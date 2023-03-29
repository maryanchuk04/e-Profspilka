using YeProfspilka.Core.Entities.Base;

namespace YeProfspilka.Core.Entities;

public class Image : BaseEntity
{
	public string ImageUrl { get; set; }

	public Image(string imageUrl)
	{
		ImageUrl = imageUrl;
	}
}