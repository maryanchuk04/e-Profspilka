using EProfspilka.Core.Entities;

namespace EProfspilka.Core.Interfaces;

public record FileUser(string FullName, string Email, string Facultet, int Course, bool IsMemberProf);

public interface IFileUserReader
{
    List<FileUser> Read(string filePath);
}