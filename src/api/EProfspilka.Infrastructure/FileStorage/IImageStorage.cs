namespace EProfspilka.Infrastructure.FileStorage;

public interface IImageStorage
{
    Task<string> UploadAsync(string base64Image);
}