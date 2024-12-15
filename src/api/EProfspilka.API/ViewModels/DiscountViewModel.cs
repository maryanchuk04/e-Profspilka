using EProfspilka.Core.Enumerations;

namespace EProfspilka.ViewModels;

public record DiscountViewModel(string Name, string Description, string CodeWord, DiscountType DiscountType);