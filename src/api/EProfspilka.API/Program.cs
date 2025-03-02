using EProfspilka.API.Extension;
using Microsoft.EntityFrameworkCore;
using EProfspilka.Db.DbInitialize;
using EProfspilka.Db.EF;
using System.Text.Json.Serialization;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureServices(builder.Configuration);

builder.Services.ConfigureSwagger();

builder.Services.ConfigureAuthorization(builder.Configuration);
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase, false));
    });

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();


app.UseCors(x =>
{
    x.AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>())
        .AllowCredentials();
});

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        var dbContext = services.GetRequiredService<EProfspilkaContext>();
        dbContext.Database.Migrate();
        DbInitializer.Seed(dbContext);
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "An error occurred while seeding the database");
    }
}

app.Run();