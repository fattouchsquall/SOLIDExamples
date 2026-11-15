import java.util.List;

public final class Demo {
    public static void main(String[] args) {
        System.out.println("--- Before: Square extends Rectangle ---");
        System.out.println("resize(rectangle, 4, 5) = " + Bad.resize(new Bad.Rectangle(2, 3), 4, 5) + " (expected 20)");
        System.out.println("resize(square, 4, 5)    = " + Bad.resize(new Bad.Square(2), 4, 5) + " (expected 20!)");

        System.out.println("\n--- After: Rectangle and Square are two independent Shapes ---");
        List<Good.Shape> shapes = List.of(new Good.Rectangle(4, 5), new Good.Square(5));
        for (Good.Shape shape : shapes) {
            System.out.println(shape.getClass().getSimpleName() + ": " + shape.area());
        }
        System.out.println("totalArea = " + Good.totalArea(shapes));
    }
}
