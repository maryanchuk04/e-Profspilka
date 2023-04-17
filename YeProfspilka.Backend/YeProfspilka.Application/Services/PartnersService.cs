using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Exceptions;
using YeProfspilka.Core.Interfaces;
using YeProfspilka.Core.Models;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.Services;

public class PartnersService : IPartnersService
{
	private readonly AppDbContext _db;
	private readonly IMapper _mapper;

	public PartnersService(AppDbContext db, IMapper mapper)
	{
		_db = db;
		_mapper = mapper;
	}
	public async Task<PartnerDto> CreateAsync(PartnerDto partner)
	{
		var entry = await _db.AddAsync(new Partner
		{
			SubText = partner.SubText,
			SubTextLink = partner.SubTextLink,
			MainText = partner.MainText,
			Image = new Image(partner.Image)
		});

		await _db.SaveChangesAsync();

		return _mapper.Map<PartnerDto>(entry.Entity);
	}

	public async Task DeleteAsync(Guid id)
	{
		var partner = _db.Partners.FirstOrDefault(x => x.Id == id);

		if (partner == null)
		{
			throw new NotFoundException(nameof(Partner), id);
		}

		_db.Partners.Remove(partner);
		await _db.SaveChangesAsync();
	}

	public async Task<IEnumerable<PartnerDto>> GetAllAsync()
	{
		return _mapper.Map<IEnumerable<PartnerDto>>(
			await _db.Partners.Include(x => x.Image).ToListAsync());
	}

	public async Task<PartnerDto> UpdateAsync(PartnerDto partner)
	{
		var entity = _db.Partners
			.Include(x => x.Image)
			.FirstOrDefault(x => x.Id == partner.Id);

		if (entity == null)
		{
			throw new NotFoundException(nameof(Partner), partner.Id);
		}

		entity.Image.ImageUrl = partner.Image;
		entity.MainText = partner.MainText;
		entity.SubText = partner.SubText;
		entity.SubTextLink = partner.SubTextLink;

		_db.Update(entity);
		await _db.SaveChangesAsync();

		return _mapper.Map<PartnerDto>(partner);
	}
}