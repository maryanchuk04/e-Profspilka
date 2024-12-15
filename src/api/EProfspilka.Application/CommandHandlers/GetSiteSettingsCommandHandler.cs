using MediatR;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.CommandHandlers;

public class GetSiteSettingsCommand : IRequest<SiteSettingsDto>
{
}

public class GetSiteSettingsCommandHandler(YeProfspilkaContext db)
    : IRequestHandler<GetSiteSettingsCommand, SiteSettingsDto>
{
    private readonly YeProfspilkaContext _db = db;

    public Task<SiteSettingsDto> Handle(GetSiteSettingsCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
