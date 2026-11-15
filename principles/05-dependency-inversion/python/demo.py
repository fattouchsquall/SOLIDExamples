from bad import OrderService as BadOrderService
from good import EmailNotifier, InMemoryOrderRepository, MySqlOrderRepository, OrderService, SlackNotifier

print("--- Before: OrderService creates MySQL and SMTP itself ---")
BadOrderService().place_order("alice@example.com", 99.9)

print("\n--- After: OrderService receives its dependencies ---")
print("Production wiring:")
OrderService(MySqlOrderRepository(), EmailNotifier()).place_order("alice@example.com", 99.9)

print("Another wiring, same OrderService:")
repository = InMemoryOrderRepository()
OrderService(repository, SlackNotifier()).place_order("alice@example.com", 99.9)
print(f"Orders kept in memory: {len(repository.orders)}")
