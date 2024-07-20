using EProfspilka.Core.Models;
using MediatR;

namespace EProfspilka.Core.Interfaces;

public interface IImportCommand : IRequest<UploadResultModel>
{
    public string FilePath { get; set; }
}