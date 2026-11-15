using Solid.DependencyInversion.Good;
using Xunit;

namespace Solid.DependencyInversion.Tests;

public class GoodTests
{
    private sealed class RecordingNotifier : INotifier
    {
        public List<string> Messages { get; } = [];

        public void Notify(string recipient, string message)
        {
            Messages.Add($"{recipient} | {message}");
        }
    }

    private readonly InMemoryOrderRepository _repository = new();
    private readonly RecordingNotifier _notifier = new();
    private readonly OrderService _service;

    public GoodTests()
    {
        _service = new OrderService(_repository, _notifier);
    }

    [Fact]
    public void PlacingAnOrderSavesItAndNotifiesTheCustomerWithoutMySqlOrSmtp()
    {
        var order = _service.PlaceOrder("alice@example.com", 99.9m);

        Assert.Equal(new[] { order }, _repository.Orders);
        Assert.Equal(new[] { $"alice@example.com | Your order {order.Id} is confirmed" }, _notifier.Messages);
    }

    [Fact]
    public void AnInvalidAmountIsRejectedBeforeAnythingIsSavedOrSent()
    {
        var exception = Assert.Throws<ArgumentException>(() => _service.PlaceOrder("alice@example.com", 0m));

        Assert.Equal("The amount must be positive", exception.Message);
        Assert.Empty(_repository.Orders);
        Assert.Empty(_notifier.Messages);
    }
}
