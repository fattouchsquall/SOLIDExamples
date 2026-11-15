import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import org.junit.jupiter.api.Test;

class GoodTest {
    record Triangle(double base, double height) implements Good.Shape {
        @Override
        public double area() {
            return base * height / 2;
        }
    }

    @Test
    void eachShapeComputesItsOwnArea() {
        assertEquals(20, new Good.Rectangle(4, 5).area());
        assertEquals(25, new Good.Square(5).area());
    }

    @Test
    void totalAreaWorksWithAnyShape() {
        assertEquals(45, Good.totalArea(List.of(new Good.Rectangle(4, 5), new Good.Square(5))));
    }

    @Test
    void aNewShapeCanBeSubstitutedWithoutChangingTotalArea() {
        assertEquals(10, Good.totalArea(List.of(new Good.Square(2), new Triangle(4, 3))));
    }
}
