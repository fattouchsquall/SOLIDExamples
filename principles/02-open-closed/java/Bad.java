public final class Bad {
    private Bad() {
    }

    public static final class DiscountCalculator {
        public double discountFor(String customerType, double amount) {
            return switch (customerType) {
                case "regular" -> 0;
                case "premium" -> amount * 0.1;
                case "vip" -> Math.min(amount * 0.2, 50);
                default -> throw new IllegalArgumentException("Unknown customer type: " + customerType);
            };
        }
    }
}
