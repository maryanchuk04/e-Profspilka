namespace YeProfspilka.Core.Interfaces;

public interface IStudentStoreService
{
	Task<bool> IsStudent(string fullName);
}