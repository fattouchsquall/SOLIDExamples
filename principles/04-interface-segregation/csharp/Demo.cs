using Solid.InterfaceSegregation.Good;
using BadReports = Solid.InterfaceSegregation.Bad.Reports;
using BadSimplePrinter = Solid.InterfaceSegregation.Bad.SimplePrinter;

Console.WriteLine("--- Before: one big IMachine interface ---");
var badPrinter = new BadSimplePrinter();
Console.WriteLine(BadReports.PrintReport(badPrinter, "Q3 report"));
try
{
    badPrinter.Scan("Signed contract");
}
catch (NotSupportedException exception)
{
    Console.WriteLine($"Runtime error: {exception.Message}");
}

Console.WriteLine("\n--- After: small IPrinter, IScanner and IFax interfaces ---");
IPrinter simplePrinter = new SimplePrinter();
var allInOne = new AllInOnePrinter();
Console.WriteLine(Reports.PrintReport(simplePrinter, "Q3 report"));
Console.WriteLine(Reports.PrintReport(allInOne, "Q3 report"));
Console.WriteLine(Reports.Archive(allInOne, "Signed contract"));
Console.WriteLine($"SimplePrinter is a Scanner: {simplePrinter is IScanner}");
