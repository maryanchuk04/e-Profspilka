using EProfspilka.Core.Enumerations;

namespace EProfspilka.API.ViewModels;

public record CreateDiscountViewModel(
    string Name,
    string Description,
    DiscountType DiscountType,
    bool WithBarCode,
    bool WithQrCode,
    string BarCodeImage);