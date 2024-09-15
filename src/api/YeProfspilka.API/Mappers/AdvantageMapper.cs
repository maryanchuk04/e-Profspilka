using AutoMapper;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Mappers;

public class AdvantageMapper : Profile
{
    public AdvantageMapper()
    {
        CreateMap<Advantage, AdvantageDto>();
        CreateMap<AdvantageDto, Advantage>();
    }
}