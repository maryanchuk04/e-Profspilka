namespace EProfspilka.Core.Models;

public class VerifyDiscountResult
{
    public string? FullName { get; set; }
    public string? Email { get; set; }
    public string? Image { get; set; }

    public DiscountDto? Discount { get; set; }

    public bool IsSuccess { get; set; }
}