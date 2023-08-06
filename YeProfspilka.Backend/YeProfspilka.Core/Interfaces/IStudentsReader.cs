using YeProfspilka.Core.Entities;

namespace YeProfspilka.Core.Interfaces;

public interface IStudentsReader
{
    List<StudentStore> Read(string filePath);
}