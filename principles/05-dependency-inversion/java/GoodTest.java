import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GoodTest {
    static final class RecordingNotifier implements Good.Notifier {
        final List<String> messages = new ArrayList<>();

        @Override
        public void notify(String recipient, String message) {
            messages.add(recipient + " | " + message);
        }
    }

    private Good.InMemoryOrderRepository repository;
    private RecordingNotifier notifier;
    private Good.OrderService service;

    @BeforeEach
    void setUp() {
        repository = new Good.InMemoryOrderRepository();
        notifier = new RecordingNotifier();
        service = new Good.OrderService(repository, notifier);
    }

    @Test
    void placingAnOrderSavesItAndNotifiesTheCustomerWithoutMySqlOrSmtp() {
        Good.Order order = service.placeOrder("alice@example.com", 99.9);

        assertEquals(List.of(order), repository.orders());
        assertEquals(List.of("alice@example.com | Your order " + order.id() + " is confirmed"), notifier.messages);
    }

    @Test
    void anInvalidAmountIsRejectedBeforeAnythingIsSavedOrSent() {
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> service.placeOrder("alice@example.com", 0));

        assertEquals("The amount must be positive", exception.getMessage());
        assertTrue(repository.orders().isEmpty());
        assertTrue(notifier.messages.isEmpty());
    }
}
