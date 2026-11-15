import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import org.junit.jupiter.api.Test;

class GoodTest {
    private final Good.Invoice invoice = new Good.Invoice("INV-001", "Alice", List.of(
            new Good.InvoiceLine("Keyboard", 50, 2),
            new Good.InvoiceLine("Mouse", 25, 1)));

    @Test
    void theCalculatorOnlyDoesTheMath() {
        Good.InvoiceCalculator calculator = new Good.InvoiceCalculator(0.2);

        assertEquals(125, calculator.subtotal(invoice));
        assertEquals(25, calculator.vat(invoice));
        assertEquals(150, calculator.total(invoice));
    }

    @Test
    void aNewVatRateOnlyNeedsANewCalculator() {
        assertEquals(137.5, new Good.InvoiceCalculator(0.1).total(invoice));
    }

    @Test
    void theFormatterRendersTextWithoutTouchingTheDisk() {
        String text = new Good.InvoiceTextFormatter(new Good.InvoiceCalculator(0.2)).format(invoice);

        assertTrue(text.startsWith("Invoice INV-001 for Alice"));
        assertTrue(text.endsWith("Total: 150.00 €"));
    }
}
