class Rectangle:
    def __init__(self, width: float, height: float) -> None:
        self._width = width
        self._height = height

    def set_width(self, width: float) -> None:
        self._width = width

    def set_height(self, height: float) -> None:
        self._height = height

    def area(self) -> float:
        return self._width * self._height


class Square(Rectangle):
    def __init__(self, side: float) -> None:
        super().__init__(side, side)

    def set_width(self, width: float) -> None:
        self._width = width
        self._height = width

    def set_height(self, height: float) -> None:
        self._width = height
        self._height = height


def resize(rectangle: Rectangle, width: float, height: float) -> float:
    rectangle.set_width(width)
    rectangle.set_height(height)

    return rectangle.area()
