namespace EProfspilka.Core.Exceptions;

public class DiscountNotFoundException(Guid discountId) : Exception($"Discount not found with Id = '{discountId}'");