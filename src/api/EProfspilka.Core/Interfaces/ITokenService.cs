using EProfspilka.Core.Entities;

namespace EProfspilka.Core.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(User user);

    UserToken GenerateRefreshToken();
}