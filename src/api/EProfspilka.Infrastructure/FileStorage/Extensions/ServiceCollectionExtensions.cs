using EProfspilka.Infrastructure.FileStorage.Models;
using EProfspilka.Infrastructure.Google;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EProfspilka.Infrastructure.FileStorage.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection ConfigureImgBbStorage(this IServiceCollection services,
        IConfiguration configuration)
    {

        services.AddHttpClient<IImageStorage, ImgBbImageStorage>();

        services.Configure<ImgBbSettings>(configuration.GetSection(nameof(ImgBbSettings)));

        return services;
    }
}