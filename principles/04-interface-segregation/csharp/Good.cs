namespace Solid.InterfaceSegregation.Good;

public interface IPrinter
{
    string Print(string document);
}

public interface IScanner
{
    string Scan(string document);
}

public interface IFax
{
    string Fax(string document, string phoneNumber);
}

public sealed class AllInOnePrinter : IPrinter, IScanner, IFax
{
    public string Print(string document) => $"Printing \"{document}\"";

    public string Scan(string document) => $"Scanning \"{document}\"";

    public string Fax(string document, string phoneNumber) => $"Faxing \"{document}\" to {phoneNumber}";
}

public sealed class SimplePrinter : IPrinter
{
    public string Print(string document) => $"Printing \"{document}\"";
}

public static class Reports
{
    public static string PrintReport(IPrinter printer, string report) => printer.Print(report);

    public static string Archive(IScanner scanner, string document) => scanner.Scan(document);
}
