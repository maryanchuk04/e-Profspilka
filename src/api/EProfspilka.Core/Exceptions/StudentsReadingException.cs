namespace EProfspilka.Core.Exceptions;

public class StudentsReadingException(string message, Exception innerException = null) : Exception(message, innerException);