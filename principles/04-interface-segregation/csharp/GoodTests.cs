using Solid.InterfaceSegregation.Good;
using Xunit;

namespace Solid.InterfaceSegregation.Tests;

public class GoodTests
{
    private sealed class FakePrinter : IPrinter
    {
        public List<string> Printed { get; } = [];

        public string Print(string document)
        {
            Printed.Add(document);

            return "ok";
        }
    }

    [Fact]
    public void ASimplePrinterOnlyImplementsWhatItCanDo()
    {
        IPrinter simplePrinter = new SimplePrinter();

        Assert.Equal("Printing \"Q3 report\"", Reports.PrintReport(simplePrinter, "Q3 report"));
        Assert.False(simplePrinter is IScanner);
    }

    [Fact]
    public void AnAllInOnePrinterCanBeUsedAsAPrinterOrAsAScanner()
    {
        var allInOne = new AllInOnePrinter();

        Assert.Equal("Printing \"Q3 report\"", Reports.PrintReport(allInOne, "Q3 report"));
        Assert.Equal("Scanning \"Signed contract\"", Reports.Archive(allInOne, "Signed contract"));
    }

    [Fact]
    public void AFakePrinterForTestsOnlyNeedsOneMethod()
    {
        var fakePrinter = new FakePrinter();

        Reports.PrintReport(fakePrinter, "Q3 report");

        Assert.Equal(new[] { "Q3 report" }, fakePrinter.Printed);
    }
}
