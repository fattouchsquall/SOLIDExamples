namespace Solid.InterfaceSegregation.Bad;

public interface IMachine
{
    string Print(string document);

    string Scan(string document);

    string Fax(string document, string phoneNumber);
}

public sealed class AllInOnePrinter : IMachine
{
    public string Print(string document) => $"Printing \"{document}\"";

    public string Scan(string document) => $"Scanning \"{document}\"";

    public string Fax(string document, string phoneNumber) => $"Faxing \"{document}\" to {phoneNumber}";
}

public sealed class SimplePrinter : IMachine
{
    public string Print(string document) => $"Printing \"{document}\"";

    public string Scan(string document) => throw new NotSupportedException("SimplePrinter cannot scan");

    public string Fax(string document, string phoneNumber) => throw new NotSupportedException("SimplePrinter cannot fax");
}

public static class Reports
{
    public static string PrintReport(IMachine machine, string report) => machine.Print(report);
}
