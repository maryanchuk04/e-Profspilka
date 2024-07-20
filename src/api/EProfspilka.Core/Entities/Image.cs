using EProfspilka.Core.Entities.Base;

namespace EProfspilka.Core.Entities;

public class Image : BaseEntity
{
    public string? ImageUrl { get; set; }

    public Image() { }

    public Image(string imageUrl)
    {
        ImageUrl = imageUrl;
    }
}