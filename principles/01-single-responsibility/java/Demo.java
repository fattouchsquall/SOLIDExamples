import java.io.IOException;
import java.util.List;

public final class Demo {
    public static void main(String[] args) throws IOException {
        String tempDirectory = System.getProperty("java.io.tmpdir");

        System.out.println("--- Before: one class does everything ---");
        Bad.Invoice badInvoice = new Bad.Invoice("INV-001", "Alice", List.of(
                new Bad.InvoiceLine("Keyboard", 50, 2),
                new Bad.InvoiceLine("Mouse", 25, 1)));
        System.out.println(badInvoice.toText());
        System.out.println("Saved to " + badInvoice.save(tempDirectory));

        System.out.println("\n--- After: one class per responsibility ---");
        Good.Invoice invoice = new Good.Invoice("INV-002", "Alice", List.of(
                new Good.InvoiceLine("Keyboard", 50, 2),
                new Good.InvoiceLine("Mouse", 25, 1)));
        Good.InvoiceTextFormatter formatter = new Good.InvoiceTextFormatter(new Good.InvoiceCalculator(0.2));
        Good.InvoiceFileStorage storage = new Good.InvoiceFileStorage(tempDirectory);
        String text = formatter.format(invoice);
        System.out.println(text);
        System.out.println("Saved to " + storage.save(invoice, text));
    }
}
