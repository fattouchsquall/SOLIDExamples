using Solid.OpenClosed.Good;
using BadDiscountCalculator = Solid.OpenClosed.Bad.DiscountCalculator;

const decimal amount = 400m;

Console.WriteLine("--- Before: a switch that must be edited for every new customer type ---");
var badCalculator = new BadDiscountCalculator();
foreach (var customerType in new[] { "regular", "premium", "vip" })
{
    Console.WriteLine($"{customerType}: -{badCalculator.DiscountFor(customerType, amount):F2} €");
}

Console.WriteLine("\n--- After: one policy per customer type ---");
var calculator = new DiscountCalculator(new Dictionary<string, IDiscountPolicy>
{
    ["regular"] = new RegularDiscount(),
    ["premium"] = new PremiumDiscount(),
    ["vip"] = new VipDiscount(),
    ["employee"] = new EmployeeDiscount(),
});
foreach (var customerType in new[] { "regular", "premium", "vip", "employee" })
{
    Console.WriteLine($"{customerType}: -{calculator.DiscountFor(customerType, amount):F2} €");
}
Console.WriteLine("The \"employee\" discount was added without touching Good.cs");

sealed class EmployeeDiscount : IDiscountPolicy
{
    public decimal Discount(decimal amount) => amount * 0.3m;
}
