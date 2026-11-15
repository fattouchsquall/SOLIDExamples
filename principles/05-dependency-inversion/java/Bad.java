import java.util.UUID;

public final class Bad {
    private Bad() {
    }

    public record Order(String id, String customerEmail, double amount) {
    }

    public static final class MySqlDatabase {
        public void insert(String table, Order row) {
            System.out.println("[MySQL] INSERT INTO " + table
                    + " VALUES ('" + row.id() + "', '" + row.customerEmail() + "', " + row.amount() + ")");
        }
    }

    public static final class SmtpMailer {
        public void send(String to, String subject, String body) {
            System.out.println("[SMTP] To: " + to + " | " + subject + " | " + body);
        }
    }

    public static final class OrderService {
        private final MySqlDatabase database = new MySqlDatabase();
        private final SmtpMailer mailer = new SmtpMailer();

        public Order placeOrder(String customerEmail, double amount) {
            if (amount <= 0) {
                throw new IllegalArgumentException("The amount must be positive");
            }

            Order order = new Order("ORD-" + UUID.randomUUID().toString().substring(0, 8), customerEmail, amount);
            database.insert("orders", order);
            mailer.send(customerEmail, "Order confirmed", "Your order " + order.id() + " is confirmed");

            return order;
        }
    }
}
