using MediatR;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.CommandHandlers;

public class GetSiteSettingsCommand : IRequest<SiteSettingsDto>
{
}

public class GetSiteSettingsCommandHandler(EProfspilkaContext db)
    : IRequestHandler<GetSiteSettingsCommand, SiteSettingsDto>
{
    private readonly EProfspilkaContext _db = db;

    public Task<SiteSettingsDto> Handle(GetSiteSettingsCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
