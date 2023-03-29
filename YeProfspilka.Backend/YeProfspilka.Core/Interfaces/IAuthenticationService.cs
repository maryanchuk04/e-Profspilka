namespace YeProfspilka.Core.Interfaces;

public interface IAuthenticationService
{
	Task Authentication();

	Task Registration(string email, string fullName, string image);
}