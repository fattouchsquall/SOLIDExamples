namespace Solid.LiskovSubstitution.Good;

public interface IShape
{
    double Area();
}

public record Rectangle(double Width, double Height) : IShape
{
    public double Area() => Width * Height;
}

public record Square(double Side) : IShape
{
    public double Area() => Side * Side;
}

public static class Shapes
{
    public static double TotalArea(IEnumerable<IShape> shapes) => shapes.Sum(shape => shape.Area());
}
