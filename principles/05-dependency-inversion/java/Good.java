import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public final class Good {
    private Good() {
    }

    public record Order(String id, String customerEmail, double amount) {
    }

    public interface OrderRepository {
        void save(Order order);
    }

    public interface Notifier {
        void notify(String recipient, String message);
    }

    public static final class OrderService {
        private final OrderRepository repository;
        private final Notifier notifier;

        public OrderService(OrderRepository repository, Notifier notifier) {
            this.repository = repository;
            this.notifier = notifier;
        }

        public Order placeOrder(String customerEmail, double amount) {
            if (amount <= 0) {
                throw new IllegalArgumentException("The amount must be positive");
            }

            Order order = new Order("ORD-" + UUID.randomUUID().toString().substring(0, 8), customerEmail, amount);
            repository.save(order);
            notifier.notify(customerEmail, "Your order " + order.id() + " is confirmed");

            return order;
        }
    }

    public static final class MySqlOrderRepository implements OrderRepository {
        @Override
        public void save(Order order) {
            System.out.println("[MySQL] INSERT INTO orders VALUES ('"
                    + order.id() + "', '" + order.customerEmail() + "', " + order.amount() + ")");
        }
    }

    public static final class InMemoryOrderRepository implements OrderRepository {
        private final List<Order> orders = new ArrayList<>();

        @Override
        public void save(Order order) {
            orders.add(order);
        }

        public List<Order> orders() {
            return List.copyOf(orders);
        }
    }

    public static final class EmailNotifier implements Notifier {
        @Override
        public void notify(String recipient, String message) {
            System.out.println("[SMTP] To: " + recipient + " | Order confirmed | " + message);
        }
    }

    public static final class SlackNotifier implements Notifier {
        @Override
        public void notify(String recipient, String message) {
            System.out.println("[Slack] @" + recipient + ": " + message);
        }
    }
}
