using MediatR;
using Microsoft.EntityFrameworkCore;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.CommandHandlers;

public class RefreshTokenCommand(string refreshToken) : IRequest<AuthenticateResponseModel>
{
    public string RefreshToken { get; } = refreshToken;
}

public class RefreshTokenCommandHandler(EProfspilkaContext db, ITokenService tokenService)
    : IRequestHandler<RefreshTokenCommand, AuthenticateResponseModel>
{
    public async Task<AuthenticateResponseModel> Handle(RefreshTokenCommand request,
        CancellationToken cancellationToken)
    {
        var user = await db.Users
                       .AsNoTracking()
                       .AsSplitQuery()
                       .Include(x => x.UserRoles)
                       .ThenInclude(x => x.Role)
                       .Include(x => x.UserTokens)
                       .Include(x => x.Image)
                       .SingleOrDefaultAsync(u => u.UserTokens.Any(x => x.Token == request.RefreshToken),
                           cancellationToken)
                   ?? throw new NotFoundException(nameof(User), request.RefreshToken);

        var refreshToken = user.UserTokens.Single(x => x.Token == request.RefreshToken);

        if (refreshToken.Expires < DateTime.Now && refreshToken.Revoked == null)
        {
            throw new RefreshTokenException("Token is expired");
        }

        var newRefreshToken = tokenService.GenerateRefreshToken();
        refreshToken.Revoked = DateTime.Now;
        refreshToken.ReplacedByToken = newRefreshToken.Token;
        newRefreshToken.UserId = user.Id;

        await db.UserTokens.AddAsync(newRefreshToken, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);

        // Generate new JWT token
        var jwt = tokenService.GenerateAccessToken(user);

        return new AuthenticateResponseModel(jwt, newRefreshToken.Token);
    }
}