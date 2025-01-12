namespace EProfspilka.API.ViewModels;

public class EmailViewModel(string email)
{
    public string Email { get; } = email;

    public string Avatar { get; set; }
}