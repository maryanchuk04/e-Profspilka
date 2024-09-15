using AutoMapper;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Mappers;

public class PartnerMapper : Profile
{
    public PartnerMapper()
    {
        CreateMap<Partner, PartnerDto>()
            .ForMember(x => x.Image, opts => opts.MapFrom(x=> x.Image.ImageUrl));
    }
}