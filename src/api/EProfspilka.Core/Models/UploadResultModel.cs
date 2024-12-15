namespace EProfspilka.Core.Models;

public record UploadResultModel(bool IsSuccess, int Count, string Message, int NewUsers = 0, int UpdatedUsers = 0);