from bad import Rectangle as BadRectangle
from bad import Square as BadSquare
from bad import resize
from good import Rectangle, Square, total_area

print("--- Before: Square extends Rectangle ---")
print(f"resize(rectangle, 4, 5) = {resize(BadRectangle(2, 3), 4, 5)} (expected 20)")
print(f"resize(square, 4, 5)    = {resize(BadSquare(2), 4, 5)} (expected 20!)")

print("\n--- After: Rectangle and Square are two independent Shapes ---")
shapes = [Rectangle(4, 5), Square(5)]
for shape in shapes:
    print(f"{type(shape).__name__}: {shape.area()}")
print(f"total_area = {total_area(shapes)}")
