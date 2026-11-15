import java.util.List;

public final class Good {
    private Good() {
    }

    public interface Shape {
        double area();
    }

    public record Rectangle(double width, double height) implements Shape {
        @Override
        public double area() {
            return width * height;
        }
    }

    public record Square(double side) implements Shape {
        @Override
        public double area() {
            return side * side;
        }
    }

    public static double totalArea(List<? extends Shape> shapes) {
        return shapes.stream().mapToDouble(Shape::area).sum();
    }
}
