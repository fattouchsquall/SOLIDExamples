from abc import ABC, abstractmethod
from dataclasses import dataclass
from uuid import uuid4


@dataclass(frozen=True)
class Order:
    id: str
    customer_email: str
    amount: float


class OrderRepository(ABC):
    @abstractmethod
    def save(self, order: Order) -> None: ...


class Notifier(ABC):
    @abstractmethod
    def notify(self, recipient: str, message: str) -> None: ...


class OrderService:
    def __init__(self, repository: OrderRepository, notifier: Notifier) -> None:
        self.repository = repository
        self.notifier = notifier

    def place_order(self, customer_email: str, amount: float) -> Order:
        if amount <= 0:
            raise ValueError("The amount must be positive")

        order = Order(f"ORD-{uuid4().hex[:8]}", customer_email, amount)
        self.repository.save(order)
        self.notifier.notify(customer_email, f"Your order {order.id} is confirmed")

        return order


class MySqlOrderRepository(OrderRepository):
    def save(self, order: Order) -> None:
        print(f"[MySQL] INSERT INTO orders VALUES ('{order.id}', '{order.customer_email}', {order.amount})")


class InMemoryOrderRepository(OrderRepository):
    def __init__(self) -> None:
        self.orders: list[Order] = []

    def save(self, order: Order) -> None:
        self.orders.append(order)


class EmailNotifier(Notifier):
    def notify(self, recipient: str, message: str) -> None:
        print(f"[SMTP] To: {recipient} | Order confirmed | {message}")


class SlackNotifier(Notifier):
    def notify(self, recipient: str, message: str) -> None:
        print(f"[Slack] @{recipient}: {message}")
