namespace YeProfspilka.Core.Exceptions;

public class RefreshTokenException : Exception
{
    public RefreshTokenException(string message) : base(message) { }
}