using AutoMapper;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Mappers;

public class UserMapper : Profile
{
	public UserMapper()
	{
		CreateMap<UserDto, User>();

		CreateMap<User, UserDto>()
			.ForMember(x => x.Role, opts => opts.MapFrom(x => x.UserRoles.Select(x => x.RoleId).First()))
			.ForMember(x => x.Email, opts => opts.MapFrom(x => x.Email))
			.ForMember(x => x.Avatar, opts => opts.MapFrom(src => src.Image.ImageUrl));
	}
}