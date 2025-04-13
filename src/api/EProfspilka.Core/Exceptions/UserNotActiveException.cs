namespace EProfspilka.Core.Exceptions;

public class UserNotActiveException(string email) : Exception($"User {email} not active");