using Solid.LiskovSubstitution.Good;
using Xunit;

namespace Solid.LiskovSubstitution.Tests;

public class GoodTests
{
    private sealed record Triangle(double Base, double Height) : IShape
    {
        public double Area() => Base * Height / 2;
    }

    [Fact]
    public void EachShapeComputesItsOwnArea()
    {
        Assert.Equal(20, new Rectangle(4, 5).Area());
        Assert.Equal(25, new Square(5).Area());
    }

    [Fact]
    public void TotalAreaWorksWithAnyShape()
    {
        Assert.Equal(45, Shapes.TotalArea([new Rectangle(4, 5), new Square(5)]));
    }

    [Fact]
    public void ANewShapeCanBeSubstitutedWithoutChangingTotalArea()
    {
        Assert.Equal(10, Shapes.TotalArea([new Square(2), new Triangle(4, 3)]));
    }
}
