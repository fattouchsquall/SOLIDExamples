namespace Solid.DependencyInversion.Bad;

public record Order(string Id, string CustomerEmail, decimal Amount);

public sealed class MySqlDatabase
{
    public void Insert(string table, Order row)
    {
        Console.WriteLine($"[MySQL] INSERT INTO {table} VALUES ('{row.Id}', '{row.CustomerEmail}', {row.Amount})");
    }
}

public sealed class SmtpMailer
{
    public void Send(string to, string subject, string body)
    {
        Console.WriteLine($"[SMTP] To: {to} | {subject} | {body}");
    }
}

public sealed class OrderService
{
    private readonly MySqlDatabase _database = new();
    private readonly SmtpMailer _mailer = new();

    public Order PlaceOrder(string customerEmail, decimal amount)
    {
        if (amount <= 0)
        {
            throw new ArgumentException("The amount must be positive");
        }

        var order = new Order($"ORD-{Guid.NewGuid().ToString()[..8]}", customerEmail, amount);
        _database.Insert("orders", order);
        _mailer.Send(customerEmail, "Order confirmed", $"Your order {order.Id} is confirmed");

        return order;
    }
}
