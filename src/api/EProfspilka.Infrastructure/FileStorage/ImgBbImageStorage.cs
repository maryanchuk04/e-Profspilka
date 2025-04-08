using System.Text.Json;
using System.Text.Json.Serialization;
using EProfspilka.Infrastructure.FileStorage.Exceptions;
using EProfspilka.Infrastructure.FileStorage.Models;
using Microsoft.Extensions.Options;

namespace EProfspilka.Infrastructure.FileStorage;

public class ImgBbImageStorage(HttpClient httpClient, IOptions<ImgBbSettings> settings) : IImageStorage
{
    private readonly ImgBbSettings _settings = settings.Value!;

    public async Task<string> UploadAsync(string base64Image)
    {
        var formData = new Dictionary<string, string>
        {
            { "key", _settings.ApiKey },
            { "image", base64Image }
        };

        using var content = new FormUrlEncodedContent(formData);
        var response = await httpClient.PostAsync($"{_settings.BaseAddress}/1/upload", content);

        if (!response.IsSuccessStatusCode)
            throw new ImgBbImageUploadException($"Image upload failed: {response.StatusCode}");

        var json = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<ImgBbUploadResponse>(json);

        return result?.Data?.Url ?? throw new ImgBbImageUploadException("Invalid response from imgbb");
    }

    internal class ImgBbUploadResponse
    {
        [JsonPropertyName("data")]
        public ImgBbData Data { get; set; }
        public bool Success { get; set; }
        public int Status { get; set; }
    }

    internal class ImgBbData
    {
        [JsonPropertyName("id")] public string Id { get; set; }
        [JsonPropertyName("url")] public string Url { get; set; }
    }
}