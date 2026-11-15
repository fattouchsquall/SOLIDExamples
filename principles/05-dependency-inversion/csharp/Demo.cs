using Solid.DependencyInversion.Good;
using BadOrderService = Solid.DependencyInversion.Bad.OrderService;

Console.WriteLine("--- Before: OrderService creates MySQL and SMTP itself ---");
new BadOrderService().PlaceOrder("alice@example.com", 99.9m);

Console.WriteLine("\n--- After: OrderService receives its dependencies ---");
Console.WriteLine("Production wiring:");
new OrderService(new MySqlOrderRepository(), new EmailNotifier()).PlaceOrder("alice@example.com", 99.9m);

Console.WriteLine("Another wiring, same OrderService:");
var repository = new InMemoryOrderRepository();
new OrderService(repository, new SlackNotifier()).PlaceOrder("alice@example.com", 99.9m);
Console.WriteLine($"Orders kept in memory: {repository.Orders.Count}");
