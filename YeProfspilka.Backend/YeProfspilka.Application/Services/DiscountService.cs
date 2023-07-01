using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.Services;

public class DiscountService : IDiscountService
{
    private readonly YeProfspilkaContext _db;
    private readonly IMapper _mapper;

    public DiscountService(YeProfspilkaContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<DiscountDto> CreateAsync(DiscountDto discountDto)
    {
        var entry = await _db.Discounts.AddAsync(new Discount
        {
            Description = discountDto.Description,
            CodeWord = discountDto.CodeWord,
            IsOpen = discountDto.IsOpen,
            Name = discountDto.Name
        });

        await _db.SaveChangesAsync();

        return _mapper.Map<DiscountDto>(entry.Entity);
    }


    public async Task<DiscountDto> UpdateAsync(DiscountDto discountDto)
    {
        var entity = _db.Discounts.FirstOrDefault(x => x.Id == discountDto.Id);

        if (entity is null)
        {
            throw new NotFoundException(nameof(Discount), discountDto.Id);
        }

        entity.Description = discountDto.Description;
        entity.Name = discountDto.Name;
        entity.CodeWord = discountDto.CodeWord;
        entity.IsOpen = discountDto.IsOpen;

        _db.Discounts.Update(entity);
        await _db.SaveChangesAsync();

        return _mapper.Map<DiscountDto>(entity);
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _db.Discounts.FirstOrDefaultAsync(x => x.Id == id);

        if (entity is null)
        {
            throw new NotFoundException(nameof(Discount), id);
        }

        _db.Discounts.Remove(entity);
        await _db.SaveChangesAsync();
    }

    public async Task<DiscountDto> GetByIdAsync(Guid id)
    {
        var entity = await _db.Discounts.FirstOrDefaultAsync(x => x.Id == id);

        if (entity is null)
        {
            throw new NotFoundException(nameof(Discount), id);
        }

        return _mapper.Map<DiscountDto>(entity);
    }

    public async Task<IEnumerable<DiscountDto>> GetAsync()
    {
        return _mapper.Map<IEnumerable<DiscountDto>>(await _db.Discounts.ToListAsync());
    }
}