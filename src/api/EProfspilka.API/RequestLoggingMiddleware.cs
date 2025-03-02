using System.Text;

namespace EProfspilka.API;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        _logger.LogInformation("🔵 [Middleware] Incoming Request: {Method} {Path}", context.Request.Method, context.Request.Path);

        foreach (var header in context.Request.Headers)
        {
            _logger.LogInformation("📌 Header: {Key}: {Value}", header.Key, header.Value);
        }

        foreach (var cookie in context.Request.Cookies)
        {
            _logger.LogInformation("🍪 Cookie: {Key}: {Value}", cookie.Key, cookie.Value);
        }

        if (context.Request.Method != HttpMethods.Get)
        {
            context.Request.EnableBuffering(); 
            var bodyStream = new StreamReader(context.Request.Body, Encoding.UTF8, leaveOpen: true);
            var bodyText = await bodyStream.ReadToEndAsync();
            context.Request.Body.Position = 0;

            _logger.LogInformation("📝 Request Body: {Body}", bodyText);
        }

        await _next(context);
    }
}
