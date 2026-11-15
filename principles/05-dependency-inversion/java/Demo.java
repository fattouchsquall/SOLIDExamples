public final class Demo {
    public static void main(String[] args) {
        System.out.println("--- Before: OrderService creates MySQL and SMTP itself ---");
        new Bad.OrderService().placeOrder("alice@example.com", 99.9);

        System.out.println("\n--- After: OrderService receives its dependencies ---");
        System.out.println("Production wiring:");
        new Good.OrderService(new Good.MySqlOrderRepository(), new Good.EmailNotifier())
                .placeOrder("alice@example.com", 99.9);

        System.out.println("Another wiring, same OrderService:");
        Good.InMemoryOrderRepository repository = new Good.InMemoryOrderRepository();
        new Good.OrderService(repository, new Good.SlackNotifier()).placeOrder("alice@example.com", 99.9);
        System.out.println("Orders kept in memory: " + repository.orders().size());
    }
}
