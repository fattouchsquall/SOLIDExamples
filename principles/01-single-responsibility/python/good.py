from dataclasses import dataclass
from pathlib import Path


@dataclass
class InvoiceLine:
    label: str
    unit_price: float
    quantity: int


@dataclass
class Invoice:
    number: str
    customer: str
    lines: list[InvoiceLine]


class InvoiceCalculator:
    def __init__(self, vat_rate: float) -> None:
        self.vat_rate = vat_rate

    def subtotal(self, invoice: Invoice) -> float:
        return sum(line.unit_price * line.quantity for line in invoice.lines)

    def vat(self, invoice: Invoice) -> float:
        return self.subtotal(invoice) * self.vat_rate

    def total(self, invoice: Invoice) -> float:
        return self.subtotal(invoice) + self.vat(invoice)


class InvoiceTextFormatter:
    def __init__(self, calculator: InvoiceCalculator) -> None:
        self.calculator = calculator

    def format(self, invoice: Invoice) -> str:
        rows = [
            f"  {line.label} x{line.quantity}: {line.unit_price * line.quantity:.2f} €"
            for line in invoice.lines
        ]

        return "\n".join(
            [
                f"Invoice {invoice.number} for {invoice.customer}",
                *rows,
                f"Subtotal: {self.calculator.subtotal(invoice):.2f} €",
                f"VAT: {self.calculator.vat(invoice):.2f} €",
                f"Total: {self.calculator.total(invoice):.2f} €",
            ]
        )


class InvoiceFileStorage:
    def __init__(self, directory: str) -> None:
        self.directory = directory

    def save(self, invoice: Invoice, content: str) -> str:
        path = Path(self.directory) / f"{invoice.number}.txt"
        path.write_text(content, encoding="utf-8")

        return str(path)
