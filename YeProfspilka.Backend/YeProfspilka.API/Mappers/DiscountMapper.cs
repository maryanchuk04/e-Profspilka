using AutoMapper;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Mappers;

public class DiscountMapper : Profile
{
    public DiscountMapper()
    {
        CreateMap<DiscountDto, Discount>();
        CreateMap<Discount, DiscountDto>();
        CreateMap<DiscountCode, DiscountCodeDto>();
        CreateMap<DiscountCodeDto, DiscountCode>();
    }
}