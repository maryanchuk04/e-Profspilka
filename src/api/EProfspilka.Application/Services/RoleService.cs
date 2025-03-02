using EProfspilka.Core.Entities;
using EProfspilka.Core.Interfaces;

namespace EProfspilka.Application.Services;

public class RoleService : IRoleService
{
    public Core.Enumerations.Role RoleResolver(IEnumerable<UserRole> userRoles)
    {
        var userRolesEnum = userRoles.Select(x => x.Role.Id).ToList();

        if (userRolesEnum.Contains(Core.Enumerations.Role.Admin))
            return Core.Enumerations.Role.Admin;

        if (userRolesEnum.Contains(Core.Enumerations.Role.Moderator))
            return Core.Enumerations.Role.Moderator;

        if (userRolesEnum.Contains(Core.Enumerations.Role.Member))
            return Core.Enumerations.Role.Member;

        return userRolesEnum.Contains(Core.Enumerations.Role.Student)
            ? Core.Enumerations.Role.Student
            : Core.Enumerations.Role.NotVerified;
    }
}
