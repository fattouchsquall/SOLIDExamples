# I — Interface Segregation Principle (ISP)

> 🇫🇷 [Lire en français](README.fr.md)

> **Clients should not be forced to depend on methods they do not use.**
> — Robert C. Martin

## In plain words

Prefer **several small, focused interfaces** over one big "do-everything" interface.

A class should only promise what it can actually do, and a function should only ask for what it actually needs.

## The problem

[`typescript/bad.ts`](typescript/bad.ts) defines one interface for every office machine:

```ts
export interface Machine {
  print(document: string): string;
  scan(document: string): string;
  fax(document: string, phoneNumber: string): string;
}
```

That's fine for an all-in-one printer. But a simple printer can only print, and it is **forced** to implement the rest:

```ts
export class SimplePrinter implements Machine {
  print(document: string): string { return `Printing "${document}"`; }
  scan(): string { throw new Error('SimplePrinter cannot scan'); }
  fax(): string { throw new Error('SimplePrinter cannot fax'); }
}
```

What goes wrong:

- **Lies in the type system**: `SimplePrinter` claims it can scan. The compiler believes it, so calling `scan()` compiles, then crashes at runtime.
- **Useless coupling**: `printReport()` only prints, but it asks for a whole `Machine`. Add a `staple()` method to `Machine` and every class must change, even those that have nothing to do with stapling.
- **Painful tests**: a fake for `printReport()` must implement three methods, two of them for nothing.

Notice that throwing in `scan()` also **breaks LSP**: a `SimplePrinter` cannot replace a `Machine`. The two principles often go hand in hand.

## The fix

[`typescript/good.ts`](typescript/good.ts) splits the big interface into roles:

```ts
export interface Printer { print(document: string): string; }
export interface Scanner { scan(document: string): string; }
export interface Fax { fax(document: string, phoneNumber: string): string; }

export class SimplePrinter implements Printer { /* print only */ }
export class AllInOnePrinter implements Printer, Scanner, Fax { /* all three */ }
```

And each function asks only for the role it needs:

```ts
export function printReport(printer: Printer, report: string): string { /* ... */ }
export function archive(scanner: Scanner, document: string): string { /* ... */ }
```

Now:

- `archive(new SimplePrinter(), '...')` **does not compile**. The bug is caught before it runs.
- The all-in-one printer can be passed to `printReport` *and* to `archive`.
- A test double for `printReport` is a one-method object (see [the tests](typescript/good.test.ts)).

### What about JavaScript?

JavaScript has no interfaces, so you cannot be "forced" by the compiler. The principle still applies to your **classes and base classes**: don't give a class methods it cannot honor (like `scan()` throwing in [`nodejs/bad.js`](nodejs/bad.js)), and keep the objects your functions expect as small as possible. In [`nodejs/good.js`](nodejs/good.js), `SimplePrinter` simply has no `scan` method.

## Run it

```bash
node principles/04-interface-segregation/typescript/demo.ts
node principles/04-interface-segregation/nodejs/demo.js
php principles/04-interface-segregation/php/demo.php
```

## Warning signs

- Methods that `throw new Error('Not implemented')` or have an empty body only to satisfy an interface.
- An interface with many methods that most implementations only partially use.
- A function that receives a big object but only calls one of its methods.
- Adding a method to an interface forces you to edit classes that will never use it.

## Don't overdo it

One method per interface is not the goal. Group methods that are **always used together** by the same clients. `Printer` with `print()` and `cancelPrintJob()` would be perfectly fine.

Split an interface when you see a client that only needs part of it, not before.

## Go further

- 🏋️ Exercise: [`exercises/04-interface-segregation`](../../exercises/04-interface-segregation)
- ⬅️ Previous principle: [Liskov Substitution Principle](../03-liskov-substitution)
- ➡️ Next principle: [Dependency Inversion Principle](../05-dependency-inversion)
