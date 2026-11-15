import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public final class Bad {
    private Bad() {
    }

    public record InvoiceLine(String label, double unitPrice, int quantity) {
    }

    public static final class Invoice {
        private final String number;
        private final String customer;
        private final List<InvoiceLine> lines;

        public Invoice(String number, String customer, List<InvoiceLine> lines) {
            this.number = number;
            this.customer = customer;
            this.lines = lines;
        }

        public double subtotal() {
            return lines.stream().mapToDouble(line -> line.unitPrice() * line.quantity()).sum();
        }

        public double vat() {
            return subtotal() * 0.2;
        }

        public double total() {
            return subtotal() + vat();
        }

        public String toText() {
            List<String> rows = new ArrayList<>();
            rows.add(String.format(Locale.ROOT, "Invoice %s for %s", number, customer));

            for (InvoiceLine line : lines) {
                rows.add(String.format(
                        Locale.ROOT,
                        "  %s x%d: %.2f €",
                        line.label(),
                        line.quantity(),
                        line.unitPrice() * line.quantity()));
            }

            rows.add(String.format(Locale.ROOT, "Subtotal: %.2f €", subtotal()));
            rows.add(String.format(Locale.ROOT, "VAT: %.2f €", vat()));
            rows.add(String.format(Locale.ROOT, "Total: %.2f €", total()));

            return String.join("\n", rows);
        }

        public String save(String directory) throws IOException {
            Path path = Path.of(directory, number + ".txt");
            Files.writeString(path, toText());

            return path.toString();
        }
    }
}
