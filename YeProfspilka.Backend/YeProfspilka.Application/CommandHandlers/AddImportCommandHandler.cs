using MediatR;
using Microsoft.Extensions.Logging;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Application.CommandHandlers;

public class AddImportCommand : IImportCommand
{
    public AddImportCommand(string filePath)
    {
        FilePath = filePath;
    }

    public string FilePath { get; set; }
}

public class AddImportCommandHandler : IRequestHandler<AddImportCommand, UploadResultModel>
{
    private readonly ILogger<AddImportCommandHandler> _logger;

    public AddImportCommandHandler(ILogger<AddImportCommandHandler> logger)
    {
        _logger = logger;
    }

    public async Task<UploadResultModel> Handle(AddImportCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Add import executed");
        throw new NotImplementedException();
    }
}