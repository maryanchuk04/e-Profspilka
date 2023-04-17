using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using YeProfspilka.Application.Configurations;
using YeProfspilka.Db.EF;
using YeProfspilka.Application.Services;
using YeProfspilka.Backend.Mappers;
using YeProfspilka.Backend.Policies;
using YeProfspilka.Core.Interfaces;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configure db context
builder.Services.AddDbContextFactory<AppDbContext>(
	options => options.UseSqlServer(
		builder.Configuration.GetConnectionString("ApplicationDbConnectionString"),
		b => b.MigrationsAssembly("YeProfspilka.Db")),
	ServiceLifetime.Scoped);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddSingleton<ISecurityContext, SecurityContext>();
builder.Services.AddScoped<IUserServices, UserService>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IStudentStoreService, StudentStoreService>();
builder.Services.AddScoped<IQuestionService, QuestionService>();

// App configuration
var appConfig = new AppConfiguration();
builder.Configuration.GetSection("App").Bind(appConfig);
builder.Services.AddSingleton(appConfig);

// Jwt configuration.
var jwtConfiguration = new JwtConfiguration();
builder.Configuration.GetSection("Jwt").Bind(jwtConfiguration);
builder.Services.AddSingleton(jwtConfiguration);

builder.Services.AddSwaggerGen(options =>
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
builder.Services.AddAutoMapper(typeof(EventsMapper).GetTypeInfo().Assembly);
builder.Services
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
		options.AddPolicy(PolicyNames.ModeratorAndAdminPolicyName, policy =>
			policy.Requirements.Add(new RoleRequirement(PolicyNames.ModeratorAndAdminRole)));
	})
	.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(options =>
	{
		options.TokenValidationParameters = new TokenValidationParameters()
		{
			ValidateActor = true,
			ValidateAudience = true,
			ValidateLifetime = true,
			ValidateIssuerSigningKey = true,
			ValidIssuer = builder.Configuration["Jwt:Issuer"],
			ValidAudience = builder.Configuration["Jwt:Audience"],
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
		};
	});
builder.Services.AddSingleton<IAuthorizationHandler, RoleHandler>();

// Add Logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors(x =>
{
	x.AllowAnyMethod()
		.AllowAnyHeader()
		.WithOrigins(builder.Configuration.GetSection("AllowedOrigins")
			.Get<string[]>())
		.AllowCredentials();
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();