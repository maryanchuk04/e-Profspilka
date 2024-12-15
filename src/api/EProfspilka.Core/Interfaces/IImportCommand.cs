using MediatR;
using EProfspilka.Core.Models;

namespace EProfspilka.Core.Interfaces;

public interface IImportCommand : IRequest<UploadResultModel>
{
    public string FilePath { get; set; }
}