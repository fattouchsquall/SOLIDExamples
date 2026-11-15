from tempfile import gettempdir

from bad import Invoice as BadInvoice
from good import Invoice, InvoiceCalculator, InvoiceFileStorage, InvoiceLine, InvoiceTextFormatter

lines = [
    InvoiceLine("Keyboard", 50.0, 2),
    InvoiceLine("Mouse", 25.0, 1),
]

print("--- Before: one class does everything ---")
bad_invoice = BadInvoice("INV-001", "Alice", lines)
print(bad_invoice.to_text())
print(f"Saved to {bad_invoice.save(gettempdir())}")

print("\n--- After: one class per responsibility ---")
invoice = Invoice("INV-002", "Alice", lines)
formatter = InvoiceTextFormatter(InvoiceCalculator(0.2))
storage = InvoiceFileStorage(gettempdir())
text = formatter.format(invoice)
print(text)
print(f"Saved to {storage.save(invoice, text)}")
