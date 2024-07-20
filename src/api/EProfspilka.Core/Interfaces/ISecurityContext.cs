namespace EProfspilka.Core.Interfaces;

public interface ISecurityContext
{
    Guid GetCurrentUserId();
}