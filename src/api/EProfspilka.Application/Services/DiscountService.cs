using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Enumerations;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.Services;

public class DiscountService(EProfspilkaContext db, IMapper mapper) : IDiscountService
{
    public async Task<DiscountDto> CreateAsync(DiscountDto discountDto)
    {
        var discount = new Discount
        {
            Name = discountDto.Name,
            Description = discountDto.Description,
            DiscountType = discountDto.DiscountType,
            PromoCode = discountDto.PromoCode
        };

        UpdateAccessTypes(discount, discountDto);
        UpdateBarCodeImage(discount, discountDto.BarCodeImage);

        var entry = await db.Discounts.AddAsync(discount);
        await db.SaveChangesAsync();

        return mapper.Map<DiscountDto>(entry.Entity);
    }

    public async Task<DiscountDto> UpdateAsync(DiscountDto discountDto)
    {
        var entity = await db.Discounts
            .Include(d => d.BarCodeImage)
            .FirstOrDefaultAsync(x => x.Id == discountDto.Id)
            ?? throw new NotFoundException(nameof(Discount), discountDto.Id);

        entity.Name = discountDto.Name;
        entity.Description = discountDto.Description;
        entity.DiscountType = discountDto.DiscountType;
        entity.PromoCode = discountDto.PromoCode;

        UpdateAccessTypes(entity, discountDto);
        UpdateBarCodeImage(entity, discountDto.BarCodeImage);

        db.Discounts.Update(entity);
        await db.SaveChangesAsync();

        return mapper.Map<DiscountDto>(entity);
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await db.Discounts.FindAsync(id)
            ?? throw new NotFoundException(nameof(Discount), id);

        db.Discounts.Remove(entity);
        await db.SaveChangesAsync();
    }

    public async Task<DiscountDto> GetByIdAsync(Guid id)
    {
        var entity = await db.Discounts
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id)
            ?? throw new NotFoundException(nameof(Discount), id);

        return mapper.Map<DiscountDto>(entity);
    }

    public async Task<IEnumerable<DiscountDto>> GetAsync()
    {
        var discounts = await db.Discounts
            .AsNoTracking()
            .Include(x => x.BarCodeImage)
            .ToListAsync();

        return discounts.Select(mapper.Map<DiscountDto>);
    }

    private static void UpdateAccessTypes(Discount discount, DiscountDto discountDto)
    {
        discount.AccessTypes = DiscountAccessType.None;

        if (discountDto.WithQrCode == true)
            discount.AccessTypes |= DiscountAccessType.QRCode;

        if (discountDto.WithBarCode == true)
            discount.AccessTypes |= DiscountAccessType.BarCode;

        if (discountDto.WithPromoCode == true)
            discount.AccessTypes |= DiscountAccessType.PromoCode;
    }

    private static void UpdateBarCodeImage(Discount discount, string? barCodeImage)
    {
        if (string.IsNullOrEmpty(barCodeImage)) return;

        if (discount.BarCodeImage != null)
        {
            discount.BarCodeImage.ImageUrl = barCodeImage;
        }
        else
        {
            discount.BarCodeImage = new Image(barCodeImage);
        }
    }
}
