using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.Services;

public class DiscountService(YeProfspilkaContext db, IMapper mapper) : IDiscountService
{
    public async Task<DiscountDto> CreateAsync(DiscountDto discountDto)
    {
        var discount = new Discount
        {
            Description = discountDto.Description,
            WithBarCode = discountDto.WithBarCode,
            WithQrCode = discountDto.WithQrCode,
            DiscountType = discountDto.DiscountType,
            Name = discountDto.Name
        };

        if (discountDto.BarCodeImage is not null)
        {
            discount.BarCodeImage = new Image(discountDto.BarCodeImage);
        }

        var entry = await db.Discounts.AddAsync(discount);

        await db.SaveChangesAsync();

        return mapper.Map<DiscountDto>(entry.Entity);
    }


    public async Task<DiscountDto> UpdateAsync(DiscountDto discountDto)
    {
        var entity = db.Discounts.FirstOrDefault(x => x.Id == discountDto.Id);

        if (entity is null)
        {
            throw new NotFoundException(nameof(Discount), discountDto.Id);
        }

        entity.Description = discountDto.Description;
        entity.Name = discountDto.Name;
        entity.WithBarCode = discountDto.WithBarCode;
        entity.WithQrCode = discountDto.WithQrCode;
        if (discountDto.BarCodeImage != null)
        {
            if (entity.BarCodeImage != null)
            {
                entity.BarCodeImage.ImageUrl = discountDto.BarCodeImage;
            }
            else
            {
                entity.BarCodeImage = new Image(discountDto.BarCodeImage);
            }
        }

        entity.DiscountType = discountDto.DiscountType;

        db.Discounts.Update(entity);
        await db.SaveChangesAsync();

        return mapper.Map<DiscountDto>(entity);
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await db.Discounts.FirstOrDefaultAsync(x => x.Id == id);

        if (entity is null)
        {
            throw new NotFoundException(nameof(Discount), id);
        }

        db.Discounts.Remove(entity);
        await db.SaveChangesAsync();
    }

    public async Task<DiscountDto> GetByIdAsync(Guid id)
    {
        var entity = await db.Discounts.FirstOrDefaultAsync(x => x.Id == id);

        if (entity is null)
        {
            throw new NotFoundException(nameof(Discount), id);
        }

        return mapper.Map<DiscountDto>(entity);
    }

    public async Task<IEnumerable<DiscountDto>> GetAsync()
    {
        return mapper.Map<IEnumerable<DiscountDto>>(
            await db.Discounts
                .Include(x => x.BarCodeImage)
                .ToListAsync());
    }
}