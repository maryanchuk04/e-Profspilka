using EProfspilka.Core.Entities;

namespace EProfspilka.Core.Interfaces;

public interface IStudentsReader
{
    List<StudentStore> Read(string filePath);
}