using EProfspilka.Core.Models;
using EProfspilka.Db.EF;
using MediatR;

namespace EProfispilka.Application.CommandHandlers;

public class GetSiteSettingsCommand : IRequest<SiteSettingsDto>
{
}

public class GetSiteSettingsCommandHandler(YeProfspilkaContext db) : IRequestHandler<GetSiteSettingsCommand, SiteSettingsDto>
{
    public Task<SiteSettingsDto> Handle(GetSiteSettingsCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
