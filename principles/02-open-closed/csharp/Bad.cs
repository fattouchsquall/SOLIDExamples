namespace Solid.OpenClosed.Bad;

public sealed class DiscountCalculator
{
    public decimal DiscountFor(string customerType, decimal amount) => customerType switch
    {
        "regular" => 0m,
        "premium" => amount * 0.1m,
        "vip" => Math.Min(amount * 0.2m, 50m),
        _ => throw new ArgumentException($"Unknown customer type: {customerType}"),
    };
}
