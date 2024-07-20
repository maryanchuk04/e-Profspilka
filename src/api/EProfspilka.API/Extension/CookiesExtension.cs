using EProfspilka.API.Utils;
using EProfspilka.Core.Models;

namespace EProfspilka.API.Extension;

public static class CookieExtension
{
    public static void SetTokenCookie(this HttpContext context, AuthenticateResponseModel model)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.Now.AddDays(7),
            Secure = true,
            SameSite = SameSiteMode.None,
        };

        //context.Response.Cookies.Delete("yeProfspilkaRefreshToken");
        context.Response.Cookies.Append(CookieConstants.RefreshTokenKey, model.RefreshToken, cookieOptions);
    }

    public static void DeleteRefreshToken(this HttpContext context)
    {
        context.Response.Cookies.Delete(CookieConstants.RefreshTokenKey);
    }
}
