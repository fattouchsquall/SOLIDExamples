from abc import ABC, abstractmethod
from dataclasses import dataclass


class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...


@dataclass(frozen=True)
class Rectangle(Shape):
    width: float
    height: float

    def area(self) -> float:
        return self.width * self.height


@dataclass(frozen=True)
class Square(Shape):
    side: float

    def area(self) -> float:
        return self.side * self.side


def total_area(shapes: list[Shape]) -> float:
    return sum(shape.area() for shape in shapes)
