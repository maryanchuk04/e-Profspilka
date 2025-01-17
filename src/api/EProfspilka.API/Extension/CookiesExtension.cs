using EProfspilka.API.Utils;
using EProfspilka.Core.Models;

namespace EProfspilka.API.Extension;

public static class CookieExtension
{
    public static void SetTokenCookie(this HttpContext context, AuthenticateResponseModel model)
    {
        var refreshTokenCookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.Now.AddDays(7),
            Secure = true,
            SameSite = SameSiteMode.None,
        };

        var accessTokenCookieOptions = new CookieOptions()
        {
            HttpOnly = false,
            Expires = DateTimeOffset.UtcNow.AddHours(7),
            Secure = true,
            SameSite = SameSiteMode.None,
        };

        context.Response.Cookies.Append(CookieConstants.AccessTokenKey, model.JwtToken, accessTokenCookieOptions);
        context.Response.Cookies.Append(CookieConstants.RefreshTokenKey, model.RefreshToken, refreshTokenCookieOptions);
    }

    public static void DeleteRefreshToken(this HttpContext context)
    {
        context.Response.Cookies.Delete(CookieConstants.RefreshTokenKey);
    }

    public static void ClearApplicationCookies(this HttpContext context)
    {
        context.Response.Cookies.Delete(CookieConstants.RefreshTokenKey);
        context.Response.Cookies.Delete(CookieConstants.AccessTokenKey);
    }
}
