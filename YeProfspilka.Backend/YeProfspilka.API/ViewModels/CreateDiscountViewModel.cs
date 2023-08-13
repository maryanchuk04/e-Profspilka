using YeProfspilka.Core.Enumerations;

namespace YeProfspilka.Backend.ViewModels;

public record CreateDiscountViewModel(
    string Name,
    string Description,
    DiscountType DiscountType,
    bool WithBarCode,
    bool WithQrCode,
    string BarCodeImage);