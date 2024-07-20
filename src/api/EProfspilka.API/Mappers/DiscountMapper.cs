using AutoMapper;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Models;

namespace EProfspilka.API.Mappers;

public class DiscountMapper : Profile
{
    public DiscountMapper()
    {
        CreateMap<DiscountDto, Discount>();
        CreateMap<Discount, DiscountDto>()
            .ForMember(x => x.BarCodeImage, opts => opts.MapFrom(x => x.BarCodeImage.ImageUrl ?? null));
        CreateMap<DiscountCode, DiscountCodeDto>();
        CreateMap<DiscountCodeDto, DiscountCode>();
    }
}