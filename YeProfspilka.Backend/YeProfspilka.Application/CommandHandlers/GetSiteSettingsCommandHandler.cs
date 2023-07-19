using MediatR;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.CommandHandlers;

public class GetSiteSettingsCommand : IRequest<SiteSettingsDto>
{
}

public class GetSiteSettingsCommandHandler : IRequestHandler<GetSiteSettingsCommand, SiteSettingsDto>
{
    private readonly YeProfspilkaContext _db;

    public GetSiteSettingsCommandHandler(YeProfspilkaContext db)
    {
        _db = db;
    }

    public Task<SiteSettingsDto> Handle(GetSiteSettingsCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
