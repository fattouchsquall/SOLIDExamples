namespace Solid.DependencyInversion.Good;

public record Order(string Id, string CustomerEmail, decimal Amount);

public interface IOrderRepository
{
    void Save(Order order);
}

public interface INotifier
{
    void Notify(string recipient, string message);
}

public sealed class OrderService
{
    private readonly IOrderRepository _repository;
    private readonly INotifier _notifier;

    public OrderService(IOrderRepository repository, INotifier notifier)
    {
        _repository = repository;
        _notifier = notifier;
    }

    public Order PlaceOrder(string customerEmail, decimal amount)
    {
        if (amount <= 0)
        {
            throw new ArgumentException("The amount must be positive");
        }

        var order = new Order($"ORD-{Guid.NewGuid().ToString()[..8]}", customerEmail, amount);
        _repository.Save(order);
        _notifier.Notify(customerEmail, $"Your order {order.Id} is confirmed");

        return order;
    }
}

public sealed class MySqlOrderRepository : IOrderRepository
{
    public void Save(Order order)
    {
        Console.WriteLine($"[MySQL] INSERT INTO orders VALUES ('{order.Id}', '{order.CustomerEmail}', {order.Amount})");
    }
}

public sealed class InMemoryOrderRepository : IOrderRepository
{
    private readonly List<Order> _orders = [];

    public IReadOnlyList<Order> Orders => _orders;

    public void Save(Order order)
    {
        _orders.Add(order);
    }
}

public sealed class EmailNotifier : INotifier
{
    public void Notify(string recipient, string message)
    {
        Console.WriteLine($"[SMTP] To: {recipient} | Order confirmed | {message}");
    }
}

public sealed class SlackNotifier : INotifier
{
    public void Notify(string recipient, string message)
    {
        Console.WriteLine($"[Slack] @{recipient}: {message}");
    }
}
