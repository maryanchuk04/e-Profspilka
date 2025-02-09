namespace EProfspilka.Core.Enumerations;

[Flags]
public enum DiscountAccessType : byte
{
    None = 0,
    QRCode = 1 << 0,   // 0001
    BarCode = 1 << 1,  // 0010
    PromoCode = 1 << 2, // 0100
}
