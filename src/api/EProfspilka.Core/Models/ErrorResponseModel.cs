namespace EProfspilka.Core.Models;

public class ErrorResponseModel(string message)
{
	public string Message { get; set; } = message;
}