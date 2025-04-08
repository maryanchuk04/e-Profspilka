using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EProfspilka.Infrastructure.Google.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection ConfigureGoogleAuth(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpClient<IGoogleAuthClient, GoogleAuthClient>();

        services.Configure<GoogleClientSettings>(configuration.GetSection(nameof(GoogleClientSettings)));

        return services;
    }
}