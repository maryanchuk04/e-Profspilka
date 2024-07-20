using EProfspilka.Core.Models;

namespace EProfspilka.Core.Interfaces;

public interface IAuthenticationService
{
    Task<AuthenticateResponseModel> Authenticate(string email);

    Task<AuthenticateResponseModel> Authenticate(string email, string password);

    Task<AuthenticateResponseModel> Registration(string email, string fullName, string image);
}