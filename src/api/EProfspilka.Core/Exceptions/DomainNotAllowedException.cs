namespace EProfspilka.Core.Exceptions;

public class DomainNotAllowedException(string message) : Exception(message)
{
}