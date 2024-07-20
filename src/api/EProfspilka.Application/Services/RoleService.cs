using EProfspilka.Core.Enumerations;
using EProfspilka.Core.Interfaces;

namespace EProfispilka.Application.Services;

public class RoleService : IRoleService
{
    public Role RoleResolver(IEnumerable<EProfspilka.Core.Entities.UserRole> userRoles)
    {
        var userRolesEnum = userRoles.Select(x => x.RoleId).ToList();

        if (userRolesEnum.Contains(Role.Admin))
            return Role.Admin;

        if (userRolesEnum.Contains(Role.Moderator))
            return Role.Moderator;

        if (userRolesEnum.Contains(Role.MemberProfspilka))
            return Role.MemberProfspilka;

        return userRolesEnum.Contains(Role.Student)
            ? Role.Student
            : Role.NotVerified;
    }
}
