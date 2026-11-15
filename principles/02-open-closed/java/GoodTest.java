import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Map;
import org.junit.jupiter.api.Test;

class GoodTest {
    @Test
    void eachPolicyCanBeTestedOnItsOwn() {
        assertEquals(0, new Good.RegularDiscount().discount(400));
        assertEquals(40, new Good.PremiumDiscount().discount(400));
        assertEquals(20, new Good.VipDiscount().discount(100));
        assertEquals(50, new Good.VipDiscount().discount(400));
    }

    @Test
    void aNewCustomerTypeIsAddedWithoutModifyingTheCalculator() {
        Good.DiscountPolicy employeeDiscount = amount -> amount * 0.3;

        Good.DiscountCalculator calculator = new Good.DiscountCalculator(Map.of("employee", employeeDiscount));

        assertEquals(120, calculator.discountFor("employee", 400));
    }

    @Test
    void anUnknownCustomerTypeIsRejected() {
        Good.DiscountCalculator calculator = new Good.DiscountCalculator(Map.of("regular", new Good.RegularDiscount()));

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> calculator.discountFor("gold", 400));

        assertEquals("Unknown customer type: gold", exception.getMessage());
    }
}
