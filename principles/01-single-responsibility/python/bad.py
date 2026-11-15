from dataclasses import dataclass
from pathlib import Path


@dataclass
class InvoiceLine:
    label: str
    unit_price: float
    quantity: int


class Invoice:
    def __init__(self, number: str, customer: str, lines: list[InvoiceLine]) -> None:
        self.number = number
        self.customer = customer
        self.lines = lines

    def subtotal(self) -> float:
        return sum(line.unit_price * line.quantity for line in self.lines)

    def vat(self) -> float:
        return self.subtotal() * 0.2

    def total(self) -> float:
        return self.subtotal() + self.vat()

    def to_text(self) -> str:
        rows = [
            f"  {line.label} x{line.quantity}: {line.unit_price * line.quantity:.2f} €"
            for line in self.lines
        ]

        return "\n".join(
            [
                f"Invoice {self.number} for {self.customer}",
                *rows,
                f"Subtotal: {self.subtotal():.2f} €",
                f"VAT: {self.vat():.2f} €",
                f"Total: {self.total():.2f} €",
            ]
        )

    def save(self, directory: str) -> str:
        path = Path(directory) / f"{self.number}.txt"
        path.write_text(self.to_text(), encoding="utf-8")

        return str(path)
