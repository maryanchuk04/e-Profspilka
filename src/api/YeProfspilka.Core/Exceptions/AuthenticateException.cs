namespace YeProfspilka.Core.Exceptions;

public class AuthenticateException : Exception
{
	public AuthenticateException(string message)
		: base(message)
	{ }
}