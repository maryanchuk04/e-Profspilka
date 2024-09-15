using YeProfspilka.Core.Enumerations;

namespace YeProfspilka.Backend.ViewModels;

public record DiscountViewModel(string Name, string Description, string CodeWord, DiscountType DiscountType);