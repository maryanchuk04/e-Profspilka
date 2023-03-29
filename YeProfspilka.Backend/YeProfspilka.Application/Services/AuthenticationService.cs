using YeProfspilka.Core.Interfaces;
using YeProfspilka.Db.EF;

namespace YeProfspilka.Application.Services;

public class AuthenticationService : IAuthenticationService
{
	private readonly AppDbContext _context;

	public AuthenticationService(AppDbContext context)
	{
		_context = context;
	}

	public async Task Authentication()
	{
		throw new NotImplementedException();
	}

	public async Task Registration(string email, string fullName, string image)
	{
		throw new NotImplementedException();
	}
}