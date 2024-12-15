using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Exceptions;
using EProfspilka.Core.Interfaces;
using EProfspilka.Core.Models;
using EProfspilka.Db.EF;

namespace EProfspilka.Application.Services;

public class PartnersService(YeProfspilkaContext db, IMapper mapper) : IPartnersService
{
    public async Task<PartnerDto> CreateAsync(PartnerDto partner)
	{
		var entry = await db.AddAsync(new Partner
		{
			SubText = partner.SubText,
			SubTextLink = partner.SubTextLink,
			MainText = partner.MainText,
			Image = new Image(partner.Image)
		});

		await db.SaveChangesAsync();

		return mapper.Map<PartnerDto>(entry.Entity);
	}

	public async Task DeleteAsync(Guid id)
	{
		var partner = db.Partners.FirstOrDefault(x => x.Id == id);

		if (partner == null)
		{
			throw new NotFoundException(nameof(Partner), id);
		}

		db.Partners.Remove(partner);
		await db.SaveChangesAsync();
	}

	public async Task<IEnumerable<PartnerDto>> GetAllAsync()
	{
		return mapper.Map<IEnumerable<PartnerDto>>(
			await db.Partners.Include(x => x.Image).ToListAsync());
	}

	public async Task<PartnerDto> UpdateAsync(PartnerDto partner)
	{
		var entity = db.Partners
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

		db.Update(entity);
		await db.SaveChangesAsync();

		return mapper.Map<PartnerDto>(partner);
	}
}