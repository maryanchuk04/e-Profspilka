using EProfspilka.Application.CommandHandlers;
using EProfspilka.Core.Interfaces;

namespace EProfspilka.Application.Factories;

public interface IImportCommandFactory
{
    IImportCommand? Create(string importType, string filePath);
}

public class ImportCommandFactory : IImportCommandFactory
{
    public IImportCommand? Create(string importType, string filePath)
        => importType switch
    {
        //"add" => new AddImportCommand(filePath),
        //"replace" => new ReplaceImportCommand(filePath),
        "merge" => new MergeImportCommand(filePath),
        _ => null,
    };

}