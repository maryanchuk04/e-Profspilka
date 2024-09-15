using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.Services;

public class AdvantageService : IAdvantageService
{
    private readonly IMapper _mapper;
    private readonly YeProfspilkaContext _dbContext;

    public AdvantageService(IMapper mapper, YeProfspilkaContext dbContext)
    {
        _mapper = mapper;
        _dbContext = dbContext;
    }

    public async Task<AdvantageDto> Update(AdvantageDto advantageDto)
    {
        var entity = await _dbContext.Advantage.FirstOrDefaultAsync(x => x.Id == advantageDto.Id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Advantage), advantageDto.Id);
        }

        entity.MainText = advantageDto.MainText;
        entity.SubText = advantageDto.SubText;

        _dbContext.Advantage.Update(entity);
        await _dbContext.SaveChangesAsync();

        return advantageDto;
    }

    public async Task<AdvantageDto[]> GetAll()
    {
        return _mapper.Map<AdvantageDto[]>(await _dbContext.Advantage.ToListAsync());
    }

    public async Task<AdvantageDto> GetById(Guid id)
    {
        var entity = await _dbContext.Advantage.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Advantage), id);
        }

        return _mapper.Map<AdvantageDto>(entity);
    }

    public async Task Delete(Guid id)
    {
        var entity = await _dbContext.Advantage.FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Advantage), id);
        }

        _dbContext.Advantage.Remove(entity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<AdvantageDto> Create(AdvantageDto advantageDto)
    {
        var entry = await _dbContext.Advantage.AddAsync(new Advantage
        {
            MainText = advantageDto.MainText,
            SubText = advantageDto.SubText,
        });

        await _dbContext.SaveChangesAsync();

        advantageDto.Id = entry.Entity.Id;

        return advantageDto;
    }
}