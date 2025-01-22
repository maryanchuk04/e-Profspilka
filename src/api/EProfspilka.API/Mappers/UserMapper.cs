using AutoMapper;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Models;
using Role = EProfspilka.Core.Enumerations.Role;

namespace EProfspilka.API.Mappers;

public class UserMapper : Profile
{
	public UserMapper()
	{
		CreateMap<UserDto, User>();

		CreateMap<User, UserDto>()
			//.ForMember(x => x.Role, opts => opts.MapFrom(x => RoleResolver(x.UserRole)))
			.ForMember(x => x.Email, opts => opts.MapFrom(x => x.Email))
			.ForMember(x => x.Avatar, opts => opts.MapFrom(src => src.Image.ImageUrl));
	}

	//private Role RoleResolver(IEnumerable<UserRole> userRoles)
	//{
	//	var userRolesEnum = userRoles.Select(x => x.Role).ToList();

	//	if (userRolesEnum.Contains(Role.Admin))
	//		return Role.Admin;

	//	if (userRolesEnum.Contains(Role.Moderator))
	//		return Role.Moderator;

	//	if (userRolesEnum.Contains(Role.MemberProfspilka))
	//		return Role.MemberProfspilka;

	//	return userRolesEnum.Contains(Role.Student) ? Role.Student : Role.NotVerified;
	//}

}