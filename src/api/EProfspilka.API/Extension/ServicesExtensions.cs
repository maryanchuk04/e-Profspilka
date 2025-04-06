using System.Reflection;
using System.Text;
using EProfspilka.API.Mappers;
using EProfspilka.API.Policies;
using EProfspilka.Application.CommandHandlers.Discounts;
using EProfspilka.Application.Configurations;
using EProfspilka.Application.Factories;
using EProfspilka.Application.Services;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Settings;
using EProfspilka.Db.EF;
using EProfspilka.Infrastructure.FileStorage.Extensions;
using EProfspilka.Infrastructure.Google;
using EProfspilka.Infrastructure.Google.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace EProfspilka.API.Extension;

public static class ServicesExtensions
{
    public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContextFactory<EProfspilkaContext>(
            options => options.UseSqlServer(
                configuration.GetConnectionString("ApplicationDbConnectionString"),
                b => b.MigrationsAssembly("EProfspilka.Db")));
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddSingleton<ISecurityContext, SecurityContext>();
        services.AddScoped<IUserServices, UserService>();
        services.AddScoped<IEventService, EventService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IQuestionService, QuestionService>();
        services.AddScoped<IPartnersService, PartnersService>();
        services.AddScoped<IAdvantageService, AdvantageService>();
        services.AddScoped<IDiscountService, DiscountService>();
        services.AddScoped<IFileUserReader, FileUserReader>();
        services.AddScoped<IImportCommandFactory, ImportCommandFactory>();
        services.AddScoped<IRoleService, RoleService>();

        services.ConfigureApplicationCookie(c =>
        {
            c.Cookie.SameSite = SameSiteMode.None;
            c.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        });

        // Add AutoMapper
        services.AddAutoMapper(typeof(EventsMapper).GetTypeInfo().Assembly);

        // Add MediatR
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssemblyContaining<GenerateDiscountCodeCommand>());

        // App configuration
        var appConfig = new AppConfiguration();
        configuration.GetSection("App").Bind(appConfig);
        services.AddSingleton(appConfig);

        // Jwt configuration.
        var jwtConfiguration = new JwtConfiguration();
        configuration.GetSection("Jwt").Bind(jwtConfiguration);
        services.AddSingleton(jwtConfiguration);

        services.Configure<UISettings>(configuration.GetSection(nameof(UISettings)));

        services.ConfigureGoogleAuth(configuration);
        services.ConfigureImgBbStorage(configuration);
    }

    public static void ConfigureAuthorization(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddMemoryCache()
            .AddAuthorization(options =>
            {
                options.AddPolicy(PolicyNames.AdminPolicyName, policy =>
                    policy.Requirements.Add(new RoleRequirement(PolicyNames.AdminRole)));
                options.AddPolicy(PolicyNames.StudentPolicyName, policy =>
                    policy.Requirements.Add(new RoleRequirement(PolicyNames.StudentRole)));
                options.AddPolicy(PolicyNames.MemberProfspilkaPolicyName, policy =>
                    policy.Requirements.Add(new RoleRequirement(PolicyNames.MemberProfspilkaRole)));
                options.AddPolicy(PolicyNames.NotVerifiedPolicyName, policy =>
                    policy.RequireRole(PolicyNames.NotVerifiedRole));
                options.AddPolicy(PolicyNames.ModeratorPolicyName, policy =>
                    policy.RequireRole(PolicyNames.ModeratorRole));
                options.AddPolicy(PolicyNames.HeadOfUnitPolicyName, policy =>
                    policy.RequireRole(PolicyNames.HeadOfUnitRole));
                options.AddPolicy(PolicyNames.AllRolesPolicyName, policy =>
                    policy.RequireRole(PolicyNames.AllRoles));
                options.AddPolicy(PolicyNames.ModeratorAndAdminPolicyName, policy =>
                    policy.Requirements.Add(new RoleRequirement(PolicyNames.ModeratorAndAdminRole)));
            })
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters()
                {
#if DEBUG
                    ValidateActor = true,
                    ValidateAudience = false,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = false,
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"])),
#else
                    ValidateActor = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"])),
#endif
                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");

                        if (string.IsNullOrEmpty(token))
                        {
                            token = context.Request.Cookies["e_profspilka_access_token"];
                        }

                        if (!string.IsNullOrEmpty(token))
                        {
                            context.Token = token;
                        }

                        return Task.CompletedTask;
                    }
                };
            });
        services.AddSingleton<IAuthorizationHandler, RoleHandler>();
    }

    public static void ConfigureSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Name = "Authorization",
                Description = "Bearer Authentication with JWT Token",
                Type = SecuritySchemeType.Http,
            });

            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference { Id = "Bearer", Type = ReferenceType.SecurityScheme, },
                    },
                    new List<string>()
                },
            });
        });
    }
}