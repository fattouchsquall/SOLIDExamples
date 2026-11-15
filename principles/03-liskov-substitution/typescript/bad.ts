export class Rectangle {
  protected width: number;
  protected height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

export class Square extends Rectangle {
  constructor(side: number) {
    super(side, side);
  }

  override setWidth(width: number): void {
    this.width = width;
    this.height = width;
  }

  override setHeight(height: number): void {
    this.width = height;
    this.height = height;
  }
}

export function resize(rectangle: Rectangle, width: number, height: number): number {
  rectangle.setWidth(width);
  rectangle.setHeight(height);

  return rectangle.area();
}
