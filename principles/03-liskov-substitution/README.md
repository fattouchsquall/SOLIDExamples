# L — Liskov Substitution Principle (LSP)

> 🇫🇷 [Lire en français](README.fr.md)

> **Objects of a subclass should be usable wherever objects of the parent class are expected, without breaking the program.**
> — Barbara Liskov, rephrased

## In plain words

If a piece of code works with a `Rectangle`, it must keep working when you give it **any** subclass of `Rectangle`. No surprises, no special cases, no `if (shape instanceof Square)`.

Inheritance is not about "is a" in the real world. It is about **keeping the promises** of the parent class.

## The problem

Mathematically, a square *is a* rectangle. So [`typescript/bad.ts`](typescript/bad.ts) does the obvious thing:

```ts
export class Square extends Rectangle {
  override setWidth(width: number): void {
    this.width = width;
    this.height = width;   // a square must stay square...
  }
  // same for setHeight
}
```

Now look at this function, written by someone who only knows about `Rectangle`:

```ts
export function resize(rectangle: Rectangle, width: number, height: number): number {
  rectangle.setWidth(width);
  rectangle.setHeight(height);
  return rectangle.area();
}
```

```
resize(rectangle, 4, 5) = 20 (expected 20)
resize(square, 4, 5)    = 25 (expected 20!)
```

`Rectangle` makes an implicit promise: *changing the height does not change the width*. `Square` breaks it. The compiler is happy, the code runs, and the result is silently wrong. Every function that accepts a `Rectangle` is now a potential bug.

## The fix

[`typescript/good.ts`](typescript/good.ts) stops pretending that a square is a special rectangle. Both implement a common `Shape` contract that they can **both fully honor**:

```ts
export interface Shape {
  area(): number;
}

export class Rectangle implements Shape { /* width, height */ }
export class Square implements Shape { /* side */ }

export function totalArea(shapes: Shape[]): number {
  return shapes.reduce((sum, shape) => sum + shape.area(), 0);
}
```

Two other changes help:

- The shapes are **immutable** (`readonly`): no setter, so no promise about setters to break.
- `totalArea` only relies on what `Shape` guarantees. The [tests](typescript/good.test.ts) add a `Triangle` later, and `totalArea` works with it unchanged.

## The rules behind LSP

A subclass respects LSP when it:

| Rule | Example of violation |
|---|---|
| Does not ask for **more** than its parent (preconditions) | The parent accepts any amount, the child throws for amounts above 100 |
| Does not deliver **less** than its parent (postconditions) | The parent always returns a list, the child sometimes returns `null` |
| Keeps the parent's **invariants** | `Square` changes the width when you set the height |
| Does not throw **new kinds of errors** | `Penguin extends Bird` and `fly()` throws `CannotFlyError` |

## Run it

```bash
node principles/03-liskov-substitution/typescript/demo.ts
node principles/03-liskov-substitution/nodejs/demo.js
php principles/03-liskov-substitution/php/demo.php
```

## Warning signs

- A subclass overrides a method to **throw** `NotImplemented`, or to do nothing.
- Client code checks the concrete type: `instanceof`, `typeof`, `get_class()`.
- A subclass overrides a method and changes the meaning of **another** method's result.
- The tests written for the parent class fail when run against the subclass.

## Don't overdo it

LSP is not an argument against inheritance. It tells you **when** inheritance is safe: when the child can do everything the parent promises.

When it can't, prefer a shared interface (like `Shape` here) or composition. "Is a" in real life is a hint, not a proof.

## Go further

- 🏋️ Exercise: [`exercises/03-liskov-substitution`](../../exercises/03-liskov-substitution)
- ⬅️ Previous principle: [Open/Closed Principle](../02-open-closed)
- ➡️ Next principle: [Interface Segregation Principle](../04-interface-segregation)
