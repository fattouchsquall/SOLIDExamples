namespace Solid.OpenClosed.Good;

public interface IDiscountPolicy
{
    decimal Discount(decimal amount);
}

public sealed class RegularDiscount : IDiscountPolicy
{
    public decimal Discount(decimal amount) => 0m;
}

public sealed class PremiumDiscount : IDiscountPolicy
{
    public decimal Discount(decimal amount) => amount * 0.1m;
}

public sealed class VipDiscount : IDiscountPolicy
{
    public decimal Discount(decimal amount) => Math.Min(amount * 0.2m, 50m);
}

public sealed class DiscountCalculator
{
    private readonly IReadOnlyDictionary<string, IDiscountPolicy> _policies;

    public DiscountCalculator(IReadOnlyDictionary<string, IDiscountPolicy> policies)
    {
        _policies = policies;
    }

    public decimal DiscountFor(string customerType, decimal amount)
    {
        if (!_policies.TryGetValue(customerType, out var policy))
        {
            throw new ArgumentException($"Unknown customer type: {customerType}");
        }

        return policy.Discount(amount);
    }
}
