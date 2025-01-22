namespace EProfspilka.Core.Entities.Base;

public abstract class BaseEntity
{
    public Guid Id { get; set; }

    public DateTime CreatedDateUtc { get; set; }

    public DateTime UpdatedDateUtc { get; set; }
}