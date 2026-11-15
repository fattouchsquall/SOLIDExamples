using Solid.LiskovSubstitution.Good;
using BadRectangle = Solid.LiskovSubstitution.Bad.Rectangle;
using BadSquare = Solid.LiskovSubstitution.Bad.Square;
using Resizer = Solid.LiskovSubstitution.Bad.Resizer;

Console.WriteLine("--- Before: Square extends Rectangle ---");
Console.WriteLine($"Resize(rectangle, 4, 5) = {Resizer.Resize(new BadRectangle(2, 3), 4, 5)} (expected 20)");
Console.WriteLine($"Resize(square, 4, 5)    = {Resizer.Resize(new BadSquare(2), 4, 5)} (expected 20!)");

Console.WriteLine("\n--- After: Rectangle and Square are two independent Shapes ---");
IShape[] shapes = [new Rectangle(4, 5), new Square(5)];
foreach (var shape in shapes)
{
    Console.WriteLine($"{shape.GetType().Name}: {shape.Area()}");
}
Console.WriteLine($"TotalArea = {Shapes.TotalArea(shapes)}");
