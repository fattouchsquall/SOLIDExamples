namespace Solid.SingleResponsibility.Bad;

public record InvoiceLine(string Label, decimal UnitPrice, int Quantity);

public sealed class Invoice
{
    public Invoice(string number, string customer, IReadOnlyList<InvoiceLine> lines)
    {
        Number = number;
        Customer = customer;
        Lines = lines;
    }

    public string Number { get; }

    public string Customer { get; }

    public IReadOnlyList<InvoiceLine> Lines { get; }

    public decimal Subtotal() => Lines.Sum(line => line.UnitPrice * line.Quantity);

    public decimal Vat() => Subtotal() * 0.2m;

    public decimal Total() => Subtotal() + Vat();

    public string ToText()
    {
        var rows = new List<string> { $"Invoice {Number} for {Customer}" };
        rows.AddRange(Lines.Select(line => $"  {line.Label} x{line.Quantity}: {line.UnitPrice * line.Quantity:F2} €"));
        rows.Add($"Subtotal: {Subtotal():F2} €");
        rows.Add($"VAT: {Vat():F2} €");
        rows.Add($"Total: {Total():F2} €");

        return string.Join("\n", rows);
    }

    public string Save(string directory)
    {
        var path = Path.Combine(directory, $"{Number}.txt");
        File.WriteAllText(path, ToText());

        return path;
    }
}
