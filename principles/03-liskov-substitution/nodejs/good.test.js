import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { Rectangle, Square, totalArea } from './good.js';

describe('LSP - Node.js', () => {
  test('each shape computes its own area', () => {
    assert.equal(new Rectangle(4, 5).area(), 20);
    assert.equal(new Square(5).area(), 25);
  });

  test('totalArea works with any Shape', () => {
    assert.equal(totalArea([new Rectangle(4, 5), new Square(5)]), 45);
  });

  test('a new Shape can be substituted without changing totalArea', () => {
    class Triangle {
      constructor(base, height) {
        this.base = base;
        this.height = height;
      }

      area() {
        return (this.base * this.height) / 2;
      }
    }

    assert.equal(totalArea([new Square(2), new Triangle(4, 3)]), 10);
  });
});
