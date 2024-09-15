using YeProfspilka.Core.Entities;

namespace YeProfspilka.Core.Interfaces;

public interface IRoleService
{
    Enumerations.Role RoleResolver(IEnumerable<UserRole> userRoles);
}
