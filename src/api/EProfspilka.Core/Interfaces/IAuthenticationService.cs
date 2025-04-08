using EProfspilka.Core.Models;

namespace EProfspilka.Core.Interfaces;

public interface IAuthenticationService
{
	Task<AuthenticateResponseModel> AuthenticateAsync(string email, string avatar);

    Task<AuthenticateResponseModel> AuthenticateOrRegisterAsync(string email, string fullName, string image);

    Task<AuthenticateResponseModel> Registration(string email, string fullName, string image);
}