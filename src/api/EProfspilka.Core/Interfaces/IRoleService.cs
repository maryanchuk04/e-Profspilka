using EProfspilka.Core.Entities;

namespace EProfspilka.Core.Interfaces;

public interface IRoleService
{
    Enumerations.Role RoleResolver(IEnumerable<UserRole> userRoles);
}
