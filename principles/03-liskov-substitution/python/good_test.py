import unittest
from dataclasses import dataclass

from good import Rectangle, Shape, Square, total_area


class LiskovSubstitutionTest(unittest.TestCase):
    def test_each_shape_computes_its_own_area(self) -> None:
        self.assertEqual(Rectangle(4, 5).area(), 20)
        self.assertEqual(Square(5).area(), 25)

    def test_total_area_works_with_any_shape(self) -> None:
        self.assertEqual(total_area([Rectangle(4, 5), Square(5)]), 45)

    def test_a_new_shape_can_be_substituted_without_changing_total_area(self) -> None:
        @dataclass(frozen=True)
        class Triangle(Shape):
            base: float
            height: float

            def area(self) -> float:
                return self.base * self.height / 2

        self.assertEqual(total_area([Square(2), Triangle(4, 3)]), 10)


if __name__ == "__main__":
    unittest.main()
