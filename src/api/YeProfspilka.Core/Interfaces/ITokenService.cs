using YeProfspilka.Core.Entities;

namespace YeProfspilka.Core.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(User user);

    UserToken GenerateRefreshToken();
}