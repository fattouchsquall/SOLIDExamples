import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public final class Good {
    private Good() {
    }

    public record InvoiceLine(String label, double unitPrice, int quantity) {
    }

    public record Invoice(String number, String customer, List<InvoiceLine> lines) {
    }

    public static final class InvoiceCalculator {
        private final double vatRate;

        public InvoiceCalculator(double vatRate) {
            this.vatRate = vatRate;
        }

        public double subtotal(Invoice invoice) {
            return invoice.lines().stream().mapToDouble(line -> line.unitPrice() * line.quantity()).sum();
        }

        public double vat(Invoice invoice) {
            return subtotal(invoice) * vatRate;
        }

        public double total(Invoice invoice) {
            return subtotal(invoice) + vat(invoice);
        }
    }

    public static final class InvoiceTextFormatter {
        private final InvoiceCalculator calculator;

        public InvoiceTextFormatter(InvoiceCalculator calculator) {
            this.calculator = calculator;
        }

        public String format(Invoice invoice) {
            List<String> rows = new ArrayList<>();
            rows.add(String.format(Locale.ROOT, "Invoice %s for %s", invoice.number(), invoice.customer()));

            for (InvoiceLine line : invoice.lines()) {
                rows.add(String.format(
                        Locale.ROOT,
                        "  %s x%d: %.2f €",
                        line.label(),
                        line.quantity(),
                        line.unitPrice() * line.quantity()));
            }

            rows.add(String.format(Locale.ROOT, "Subtotal: %.2f €", calculator.subtotal(invoice)));
            rows.add(String.format(Locale.ROOT, "VAT: %.2f €", calculator.vat(invoice)));
            rows.add(String.format(Locale.ROOT, "Total: %.2f €", calculator.total(invoice)));

            return String.join("\n", rows);
        }
    }

    public static final class InvoiceFileStorage {
        private final String directory;

        public InvoiceFileStorage(String directory) {
            this.directory = directory;
        }

        public String save(Invoice invoice, String content) throws IOException {
            Path path = Path.of(directory, invoice.number() + ".txt");
            Files.writeString(path, content);

            return path.toString();
        }
    }
}
