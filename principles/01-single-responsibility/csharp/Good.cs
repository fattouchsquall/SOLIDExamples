namespace Solid.SingleResponsibility.Good;

public record InvoiceLine(string Label, decimal UnitPrice, int Quantity);

public record Invoice(string Number, string Customer, IReadOnlyList<InvoiceLine> Lines);

public sealed class InvoiceCalculator
{
    private readonly decimal _vatRate;

    public InvoiceCalculator(decimal vatRate)
    {
        _vatRate = vatRate;
    }

    public decimal Subtotal(Invoice invoice) => invoice.Lines.Sum(line => line.UnitPrice * line.Quantity);

    public decimal Vat(Invoice invoice) => Subtotal(invoice) * _vatRate;

    public decimal Total(Invoice invoice) => Subtotal(invoice) + Vat(invoice);
}

public sealed class InvoiceTextFormatter
{
    private readonly InvoiceCalculator _calculator;

    public InvoiceTextFormatter(InvoiceCalculator calculator)
    {
        _calculator = calculator;
    }

    public string Format(Invoice invoice)
    {
        var rows = new List<string> { $"Invoice {invoice.Number} for {invoice.Customer}" };
        rows.AddRange(invoice.Lines.Select(line => $"  {line.Label} x{line.Quantity}: {line.UnitPrice * line.Quantity:F2} €"));
        rows.Add($"Subtotal: {_calculator.Subtotal(invoice):F2} €");
        rows.Add($"VAT: {_calculator.Vat(invoice):F2} €");
        rows.Add($"Total: {_calculator.Total(invoice):F2} €");

        return string.Join("\n", rows);
    }
}

public sealed class InvoiceFileStorage
{
    private readonly string _directory;

    public InvoiceFileStorage(string directory)
    {
        _directory = directory;
    }

    public string Save(Invoice invoice, string content)
    {
        var path = Path.Combine(_directory, $"{invoice.Number}.txt");
        File.WriteAllText(path, content);

        return path;
    }
}
