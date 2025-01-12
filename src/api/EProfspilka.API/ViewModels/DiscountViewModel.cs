using EProfspilka.Core.Enumerations;

namespace EProfspilka.API.ViewModels;

public record DiscountViewModel(string Name, string Description, string CodeWord, DiscountType DiscountType);