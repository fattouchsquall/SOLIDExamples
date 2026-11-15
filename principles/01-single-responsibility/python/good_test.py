import unittest

from good import Invoice, InvoiceCalculator, InvoiceLine, InvoiceTextFormatter


class SingleResponsibilityTest(unittest.TestCase):
    def setUp(self) -> None:
        self.invoice = Invoice(
            "INV-001",
            "Alice",
            [InvoiceLine("Keyboard", 50.0, 2), InvoiceLine("Mouse", 25.0, 1)],
        )

    def test_the_calculator_only_does_the_math(self) -> None:
        calculator = InvoiceCalculator(0.2)

        self.assertEqual(calculator.subtotal(self.invoice), 125)
        self.assertEqual(calculator.vat(self.invoice), 25)
        self.assertEqual(calculator.total(self.invoice), 150)

    def test_a_new_vat_rate_only_needs_a_new_calculator(self) -> None:
        self.assertEqual(InvoiceCalculator(0.1).total(self.invoice), 137.5)

    def test_the_formatter_renders_text_without_touching_the_disk(self) -> None:
        text = InvoiceTextFormatter(InvoiceCalculator(0.2)).format(self.invoice)

        self.assertTrue(text.startswith("Invoice INV-001 for Alice"))
        self.assertTrue(text.endswith("Total: 150.00 €"))


if __name__ == "__main__":
    unittest.main()
