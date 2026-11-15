using Solid.SingleResponsibility.Good;
using BadInvoice = Solid.SingleResponsibility.Bad.Invoice;
using BadInvoiceLine = Solid.SingleResponsibility.Bad.InvoiceLine;

var tempDirectory = Path.GetTempPath();

Console.WriteLine("--- Before: one class does everything ---");
var badInvoice = new BadInvoice("INV-001", "Alice", [new BadInvoiceLine("Keyboard", 50m, 2), new BadInvoiceLine("Mouse", 25m, 1)]);
Console.WriteLine(badInvoice.ToText());
Console.WriteLine($"Saved to {badInvoice.Save(tempDirectory)}");

Console.WriteLine("\n--- After: one class per responsibility ---");
var invoice = new Invoice("INV-002", "Alice", [new InvoiceLine("Keyboard", 50m, 2), new InvoiceLine("Mouse", 25m, 1)]);
var formatter = new InvoiceTextFormatter(new InvoiceCalculator(0.2m));
var storage = new InvoiceFileStorage(tempDirectory);
var text = formatter.Format(invoice);
Console.WriteLine(text);
Console.WriteLine($"Saved to {storage.Save(invoice, text)}");
