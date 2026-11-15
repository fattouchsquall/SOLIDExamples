using Solid.SingleResponsibility.Good;
using Xunit;

namespace Solid.SingleResponsibility.Tests;

public class GoodTests
{
    private readonly Invoice _invoice = new("INV-001", "Alice", [new InvoiceLine("Keyboard", 50m, 2), new InvoiceLine("Mouse", 25m, 1)]);

    [Fact]
    public void TheCalculatorOnlyDoesTheMath()
    {
        var calculator = new InvoiceCalculator(0.2m);

        Assert.Equal(125m, calculator.Subtotal(_invoice));
        Assert.Equal(25m, calculator.Vat(_invoice));
        Assert.Equal(150m, calculator.Total(_invoice));
    }

    [Fact]
    public void ANewVatRateOnlyNeedsANewCalculator()
    {
        Assert.Equal(137.5m, new InvoiceCalculator(0.1m).Total(_invoice));
    }

    [Fact]
    public void TheFormatterRendersTextWithoutTouchingTheDisk()
    {
        var text = new InvoiceTextFormatter(new InvoiceCalculator(0.2m)).Format(_invoice);

        Assert.StartsWith("Invoice INV-001 for Alice", text);
        Assert.EndsWith("Total: 150.00 €", text);
    }
}
