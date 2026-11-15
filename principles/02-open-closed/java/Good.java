import java.util.Map;

public final class Good {
    private Good() {
    }

    public interface DiscountPolicy {
        double discount(double amount);
    }

    public static final class RegularDiscount implements DiscountPolicy {
        @Override
        public double discount(double amount) {
            return 0;
        }
    }

    public static final class PremiumDiscount implements DiscountPolicy {
        @Override
        public double discount(double amount) {
            return amount * 0.1;
        }
    }

    public static final class VipDiscount implements DiscountPolicy {
        @Override
        public double discount(double amount) {
            return Math.min(amount * 0.2, 50);
        }
    }

    public static final class DiscountCalculator {
        private final Map<String, DiscountPolicy> policies;

        public DiscountCalculator(Map<String, DiscountPolicy> policies) {
            this.policies = policies;
        }

        public double discountFor(String customerType, double amount) {
            DiscountPolicy policy = policies.get(customerType);

            if (policy == null) {
                throw new IllegalArgumentException("Unknown customer type: " + customerType);
            }

            return policy.discount(amount);
        }
    }
}
