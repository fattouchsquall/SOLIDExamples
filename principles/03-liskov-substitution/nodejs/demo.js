import { Rectangle as BadRectangle, Square as BadSquare, resize } from './bad.js';
import { Rectangle, Square, totalArea } from './good.js';

console.log('--- Before: Square extends Rectangle ---');
console.log(`resize(rectangle, 4, 5) = ${resize(new BadRectangle(2, 3), 4, 5)} (expected 20)`);
console.log(`resize(square, 4, 5)    = ${resize(new BadSquare(2), 4, 5)} (expected 20!)`);

console.log('\n--- After: Rectangle and Square are two independent Shapes ---');
const shapes = [new Rectangle(4, 5), new Square(5)];
for (const shape of shapes) {
  console.log(`${shape.constructor.name}: ${shape.area()}`);
}
console.log(`totalArea = ${totalArea(shapes)}`);
