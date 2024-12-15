using AutoMapper;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Models;

namespace EProfspilka.Mappers;

public class PartnerMapper : Profile
{
    public PartnerMapper()
    {
        CreateMap<Partner, PartnerDto>()
            .ForMember(x => x.Image, opts => opts.MapFrom(x=> x.Image.ImageUrl));
    }
}