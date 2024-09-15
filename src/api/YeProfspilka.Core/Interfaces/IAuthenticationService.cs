using YeProfspilka.Core.Models;

namespace YeProfspilka.Core.Interfaces;

public interface IAuthenticationService
{
	Task<AuthenticateResponseModel> Authenticate(string email);

	Task<AuthenticateResponseModel> Authenticate(string email, string password);

	Task<AuthenticateResponseModel> Registration(string email, string fullName, string image);
}