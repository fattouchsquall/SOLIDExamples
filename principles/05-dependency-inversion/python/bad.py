from dataclasses import dataclass
from uuid import uuid4


@dataclass(frozen=True)
class Order:
    id: str
    customer_email: str
    amount: float


class MySqlDatabase:
    def insert(self, table: str, row: Order) -> None:
        print(f"[MySQL] INSERT INTO {table} VALUES ('{row.id}', '{row.customer_email}', {row.amount})")


class SmtpMailer:
    def send(self, to: str, subject: str, body: str) -> None:
        print(f"[SMTP] To: {to} | {subject} | {body}")


class OrderService:
    def __init__(self) -> None:
        self.database = MySqlDatabase()
        self.mailer = SmtpMailer()

    def place_order(self, customer_email: str, amount: float) -> Order:
        if amount <= 0:
            raise ValueError("The amount must be positive")

        order = Order(f"ORD-{uuid4().hex[:8]}", customer_email, amount)
        self.database.insert("orders", order)
        self.mailer.send(customer_email, "Order confirmed", f"Your order {order.id} is confirmed")

        return order
