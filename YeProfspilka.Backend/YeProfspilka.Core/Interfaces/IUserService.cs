using YeProfspilka.Core.Enumerations;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Core.Interfaces;

public interface IUserServices
{
	Task<UserDto> GetCurrentUser();

	Task<IEnumerable<UserDto>> GetUsers();

	Task<bool> UserIsExist(string email);

	Task<UserDto> UpdateUser(Guid id, string facultet, int course, Role role);
}