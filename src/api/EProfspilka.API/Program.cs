using Microsoft.EntityFrameworkCore;
using EProfspilka.Extension;
using EProfspilka.Db.DbInitialize;
using EProfspilka.Db.EF;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureServices(builder.Configuration);

builder.Services.ConfigureSwagger();

builder.Services.ConfigureAuthorization(builder.Configuration);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(x =>
{
    x.AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins(builder.Configuration.GetSection("AllowedOrigins")
            .Get<string[]>())
        .AllowCredentials();
});
app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.StatusCode = 200;

        await Task.CompletedTask;
        return;
    }
    await next();
});
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        var dbContext = services.GetRequiredService<YeProfspilkaContext>();
        dbContext.Database.Migrate();
        DbInitializer.Seed(dbContext);
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "An error occurred while seeding the database");
    }
}

app.Run();