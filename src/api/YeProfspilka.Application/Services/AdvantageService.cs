using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.Services;

public class AdvantageService(IMapper mapper, YeProfspilkaContext dbContext) : IAdvantageService
{
    public async Task<AdvantageDto> Update(AdvantageDto advantageDto)
    {
        var entity = await dbContext.Advantage.FirstOrDefaultAsync(x => x.Id == advantageDto.Id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Advantage), advantageDto.Id);
        }

        entity.MainText = advantageDto.MainText;
        entity.SubText = advantageDto.SubText;

        dbContext.Advantage.Update(entity);
        await dbContext.SaveChangesAsync();

        return advantageDto;
    }

    public async Task<AdvantageDto[]> GetAll()
    {
        return mapper.Map<AdvantageDto[]>(await dbContext.Advantage.ToListAsync());
    }

    public async Task<AdvantageDto> GetById(Guid id)
    {
        var entity = await dbContext.Advantage.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Advantage), id);
        }

        return mapper.Map<AdvantageDto>(entity);
    }

    public async Task Delete(Guid id)
    {
        var entity = await dbContext.Advantage.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Advantage), id);
        }

        dbContext.Advantage.Remove(entity);
        await dbContext.SaveChangesAsync();
    }

    public async Task<AdvantageDto> Create(AdvantageDto advantageDto)
    {
        var entry = await dbContext.Advantage.AddAsync(new Advantage
        {
            MainText = advantageDto.MainText,
            SubText = advantageDto.SubText,
        });

        await dbContext.SaveChangesAsync();

        advantageDto.Id = entry.Entity.Id;

        return advantageDto;
    }
}