namespace YeProfspilka.Core.Models;

public class ErrorResponseModel
{
	public string Message { get; set; }

	public ErrorResponseModel(string message)
	{
		Message = message;
	}
}