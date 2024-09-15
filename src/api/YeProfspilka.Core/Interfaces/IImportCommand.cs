using MediatR;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Core.Interfaces;

public interface IImportCommand : IRequest<UploadResultModel>
{
    public string FilePath { get; set; }
}