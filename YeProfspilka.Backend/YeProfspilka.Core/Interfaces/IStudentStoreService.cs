using YeProfspilka.Core.Entities;

namespace YeProfspilka.Core.Interfaces;

public interface IStudentStoreService
{
	Task<bool> IsStudent(string email);

	Task MappingUser(User user);
}