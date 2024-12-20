using AutoMapper;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Models;

namespace EProfspilka.Mappers;

public class AdvantageMapper : Profile
{
    public AdvantageMapper()
    {
        CreateMap<Advantage, AdvantageDto>();
        CreateMap<AdvantageDto, Advantage>();
    }
}