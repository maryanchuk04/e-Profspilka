using EProfspilka.Core.Enumerations;

namespace EProfspilka.ViewModels;

public record CreateDiscountViewModel(
    string Name,
    string Description,
    DiscountType DiscountType,
    bool WithBarCode,
    bool WithQrCode,
    string BarCodeImage);