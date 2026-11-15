using Solid.OpenClosed.Good;
using Xunit;

namespace Solid.OpenClosed.Tests;

public class GoodTests
{
    private sealed class EmployeeDiscount : IDiscountPolicy
    {
        public decimal Discount(decimal amount) => amount * 0.3m;
    }

    [Fact]
    public void EachPolicyCanBeTestedOnItsOwn()
    {
        Assert.Equal(0m, new RegularDiscount().Discount(400m));
        Assert.Equal(40m, new PremiumDiscount().Discount(400m));
        Assert.Equal(20m, new VipDiscount().Discount(100m));
        Assert.Equal(50m, new VipDiscount().Discount(400m));
    }

    [Fact]
    public void ANewCustomerTypeIsAddedWithoutModifyingTheCalculator()
    {
        var calculator = new DiscountCalculator(new Dictionary<string, IDiscountPolicy>
        {
            ["employee"] = new EmployeeDiscount(),
        });

        Assert.Equal(120m, calculator.DiscountFor("employee", 400m));
    }

    [Fact]
    public void AnUnknownCustomerTypeIsRejected()
    {
        var calculator = new DiscountCalculator(new Dictionary<string, IDiscountPolicy>
        {
            ["regular"] = new RegularDiscount(),
        });

        var exception = Assert.Throws<ArgumentException>(() => calculator.DiscountFor("gold", 400m));

        Assert.Equal("Unknown customer type: gold", exception.Message);
    }
}
