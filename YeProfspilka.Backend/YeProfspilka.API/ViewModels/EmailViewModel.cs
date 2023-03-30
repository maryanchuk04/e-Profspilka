namespace YeProfspilka.Backend.ViewModels;

public class EmailViewModel
{
	public EmailViewModel(string email)
	{
		Email = email;
	}

	public string Email { get; }
}