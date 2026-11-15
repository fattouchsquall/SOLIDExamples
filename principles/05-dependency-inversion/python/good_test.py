import unittest

from good import InMemoryOrderRepository, Notifier, OrderService


class RecordingNotifier(Notifier):
    def __init__(self) -> None:
        self.messages: list[tuple[str, str]] = []

    def notify(self, recipient: str, message: str) -> None:
        self.messages.append((recipient, message))


class DependencyInversionTest(unittest.TestCase):
    def setUp(self) -> None:
        self.repository = InMemoryOrderRepository()
        self.notifier = RecordingNotifier()
        self.service = OrderService(self.repository, self.notifier)

    def test_placing_an_order_saves_it_and_notifies_the_customer_without_mysql_or_smtp(self) -> None:
        order = self.service.place_order("alice@example.com", 99.9)

        self.assertEqual(self.repository.orders, [order])
        self.assertEqual(
            self.notifier.messages,
            [("alice@example.com", f"Your order {order.id} is confirmed")],
        )

    def test_an_invalid_amount_is_rejected_before_anything_is_saved_or_sent(self) -> None:
        with self.assertRaisesRegex(ValueError, "The amount must be positive"):
            self.service.place_order("alice@example.com", 0)

        self.assertEqual(self.repository.orders, [])
        self.assertEqual(self.notifier.messages, [])


if __name__ == "__main__":
    unittest.main()
