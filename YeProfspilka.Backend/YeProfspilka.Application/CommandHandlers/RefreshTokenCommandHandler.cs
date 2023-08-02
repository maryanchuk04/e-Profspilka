using MediatR;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.CommandHandlers;

public class RefreshTokenCommand : IRequest<AuthenticateResponseModel>
{
    public RefreshTokenCommand(string refreshToken)
    {
        RefreshToken = refreshToken;
    }

    public string RefreshToken { get; }
}

public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, AuthenticateResponseModel>
{
    private readonly YeProfspilkaContext _db;
    private readonly ITokenService _tokenService;

    public RefreshTokenCommandHandler(YeProfspilkaContext db, ITokenService tokenService)
    {
        _db = db;
        _tokenService = tokenService;
    }

    public async Task<AuthenticateResponseModel> Handle(RefreshTokenCommand request,
        CancellationToken cancellationToken)
    {
        var user = await _db.Users
                       .Include(x => x.UserRoles)
                       .ThenInclude(x => x.Role)
                       .Include(x => x.UserTokens)
                       .SingleOrDefaultAsync(u => u.UserTokens.Any(x => x.Token == request.RefreshToken),
                           cancellationToken)
                   ?? throw new NotFoundException(nameof(User), request.RefreshToken);

        var refreshToken = user.UserTokens.Single(x => x.Token == request.RefreshToken);

        if (refreshToken.Expires < DateTime.Now && refreshToken.Revoked == null)
        {
            throw new RefreshTokenException("Token is expired");
        }

        var newRefreshToken = _tokenService.GenerateRefreshToken();
        refreshToken.Revoked = DateTime.Now;
        refreshToken.ReplacedByToken = newRefreshToken.Token;
        newRefreshToken.UserId = user.Id;
        await _db.UserTokens.AddAsync(newRefreshToken, cancellationToken);
        await _db.SaveChangesAsync(cancellationToken);

        // Generate new JWT token
        var jwt = _tokenService.GenerateAccessToken(user);

        return new AuthenticateResponseModel(jwt, newRefreshToken.Token);
    }
}