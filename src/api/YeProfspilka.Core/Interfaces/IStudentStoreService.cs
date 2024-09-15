using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Core.Interfaces;

public interface IStudentStoreService
{
	Task<bool> IsStudent(string email);

	Task<UploadResultModel> UploadUsers(string filePath, bool IsOverrideMethod);

	Task MappingUser(User user);

	Task<IEnumerable<UserMatchingStoreModel>> GetAllUsers();
}