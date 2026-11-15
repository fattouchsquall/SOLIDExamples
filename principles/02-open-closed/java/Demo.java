import java.util.List;
import java.util.Locale;
import java.util.Map;

public final class Demo {
    static final class EmployeeDiscount implements Good.DiscountPolicy {
        @Override
        public double discount(double amount) {
            return amount * 0.3;
        }
    }

    public static void main(String[] args) {
        double amount = 400;

        System.out.println("--- Before: a switch that must be edited for every new customer type ---");
        Bad.DiscountCalculator badCalculator = new Bad.DiscountCalculator();
        for (String customerType : List.of("regular", "premium", "vip")) {
            System.out.printf(Locale.ROOT, "%s: -%.2f €%n", customerType, badCalculator.discountFor(customerType, amount));
        }

        System.out.println("\n--- After: one policy per customer type ---");
        Good.DiscountCalculator calculator = new Good.DiscountCalculator(Map.of(
                "regular", new Good.RegularDiscount(),
                "premium", new Good.PremiumDiscount(),
                "vip", new Good.VipDiscount(),
                "employee", new EmployeeDiscount()));
        for (String customerType : List.of("regular", "premium", "vip", "employee")) {
            System.out.printf(Locale.ROOT, "%s: -%.2f €%n", customerType, calculator.discountFor(customerType, amount));
        }
        System.out.println("The \"employee\" discount was added without touching Good.java");
    }
}
