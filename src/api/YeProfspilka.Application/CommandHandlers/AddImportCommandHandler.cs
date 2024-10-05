using MediatR;
using Microsoft.Extensions.Logging;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Application.CommandHandlers;

public class AddImportCommand(string filePath) : IImportCommand
{
    public string FilePath { get; set; } = filePath;
}

public class AddImportCommandHandler(ILogger<AddImportCommandHandler> logger)
    : IRequestHandler<AddImportCommand, UploadResultModel>
{
    public async Task<UploadResultModel> Handle(AddImportCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Add import executed");
        throw new NotImplementedException();
    }
}