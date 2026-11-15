namespace Solid.LiskovSubstitution.Bad;

public class Rectangle
{
    protected double _width;
    protected double _height;

    public Rectangle(double width, double height)
    {
        _width = width;
        _height = height;
    }

    public virtual void SetWidth(double width)
    {
        _width = width;
    }

    public virtual void SetHeight(double height)
    {
        _height = height;
    }

    public double Area() => _width * _height;
}

public sealed class Square : Rectangle
{
    public Square(double side)
        : base(side, side)
    {
    }

    public override void SetWidth(double width)
    {
        _width = width;
        _height = width;
    }

    public override void SetHeight(double height)
    {
        _width = height;
        _height = height;
    }
}

public static class Resizer
{
    public static double Resize(Rectangle rectangle, double width, double height)
    {
        rectangle.SetWidth(width);
        rectangle.SetHeight(height);

        return rectangle.Area();
    }
}
