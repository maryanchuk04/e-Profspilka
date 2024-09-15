using YeProfspilka.Application.CommandHandlers;
using YeProfspilka.Core.Interfaces;

namespace YeProfspilka.Application.Factories;

public interface IImportCommandFactory
{
    IImportCommand? Create(string importType, string filePath);
}

public class ImportCommandFactory : IImportCommandFactory
{
    public IImportCommand? Create(string importType, string filePath)
        => importType switch
    {
        "add" => new AddImportCommand(filePath),
        "replace" => new ReplaceImportCommand(filePath),
        _ => null,
    };

}