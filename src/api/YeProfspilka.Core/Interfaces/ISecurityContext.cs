namespace YeProfspilka.Core.Interfaces;

public interface ISecurityContext
{
	Guid GetCurrentUserId();
}