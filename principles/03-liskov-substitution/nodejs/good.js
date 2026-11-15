export class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

export class Square {
  constructor(side) {
    this.side = side;
  }

  area() {
    return this.side * this.side;
  }
}

export function totalArea(shapes) {
  return shapes.reduce((sum, shape) => sum + shape.area(), 0);
}
