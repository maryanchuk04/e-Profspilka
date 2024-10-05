namespace YeProfspilka.Backend.ViewModels;

public class EmailViewModel(string email)
{
    public string Email { get; } = email;
}