using EProfispilka.Application.CommandHandlers;
using EProfspilka.Core.Interfaces;

namespace EProfispilka.Application.Factories;

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