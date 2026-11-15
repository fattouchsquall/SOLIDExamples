# SOLID Examples

> 🇫🇷 [Lire en français](README.fr.md)

A beginner-friendly toolkit to **understand the SOLID principles** and see how to apply them, with the same examples written in **TypeScript**, **Node.js** and **PHP**.

Each principle comes with:

- 📖 a short explanation in plain words
- ❌ a "bad" version that works but hurts as soon as the code evolves
- ✅ a "good" version that fixes it, with the same behavior
- ▶️ a demo you can run to compare both
- 🧪 tests showing why the good version is easier to test
- 🏋️ an exercise with its solution

## What is SOLID?

SOLID is a set of five design principles for object-oriented code, popularized by Robert C. Martin. They help you write code that is **easy to change without breaking everything**.

| | Principle | In one sentence |
|---|---|---|
| **S** | [Single Responsibility](principles/01-single-responsibility) | A class should have only one reason to change. |
| **O** | [Open/Closed](principles/02-open-closed) | Add new behavior without modifying existing code. |
| **L** | [Liskov Substitution](principles/03-liskov-substitution) | A subclass must be usable wherever its parent is expected. |
| **I** | [Interface Segregation](principles/04-interface-segregation) | Don't force a class to depend on methods it doesn't use. |
| **D** | [Dependency Inversion](principles/05-dependency-inversion) | Depend on abstractions, not on concrete implementations. |

These are guidelines, not laws. The goal is not to tick five boxes but to recognize the pain they prevent.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 24 or later, for the TypeScript and Node.js examples
- [PHP](https://www.php.net) 8.2 or later, for the PHP examples
- [Composer](https://getcomposer.org), only to run the PHP tests

TypeScript files run directly with `node`, thanks to its built-in type stripping. No build step is needed.

### Install

```bash
git clone <repository-url>
cd solid-examples
npm install
composer install
```

### Run a demo

```bash
node principles/01-single-responsibility/typescript/demo.ts
node principles/01-single-responsibility/nodejs/demo.js
php principles/01-single-responsibility/php/demo.php
```

### Run the tests

```bash
npm test            # TypeScript and Node.js tests (node:test)
npm run typecheck   # TypeScript type checking
composer test       # PHP tests (PHPUnit)
```

## How to use this repository

1. Read the principles **in order**: each one builds on the previous ones.
2. For each principle, read the `README`, then open `bad` and `good` side by side in your editor.
3. Run the demo and check that both versions print the same result.
4. Read the tests to see what the good version makes easy.
5. Try the exercise **before** looking at the solution.
6. When you are done, check yourself with the [quiz](QUIZ.md) and keep the [cheat sheet](CHEATSHEET.md) at hand.

Pick the language you are most comfortable with. The three versions are intentionally as close as possible, so you can also compare how each language expresses the same idea.

## Structure

```
solid-examples/
├── principles/
│   ├── 01-single-responsibility/
│   │   ├── README.md / README.fr.md
│   │   ├── typescript/   bad.ts  good.ts  demo.ts  good.test.ts
│   │   ├── nodejs/       bad.js  good.js  demo.js  good.test.js
│   │   └── php/          Bad.php Good.php demo.php GoodTest.php
│   ├── 02-open-closed/
│   ├── 03-liskov-substitution/
│   ├── 04-interface-segregation/
│   └── 05-dependency-inversion/
├── exercises/
│   ├── 01-single-responsibility/
│   │   ├── README.md / README.fr.md
│   │   ├── typescript/   exercise.ts  solution.ts
│   │   ├── nodejs/       exercise.js  solution.js
│   │   └── php/          Exercise.php Solution.php
│   └── ...
├── CHEATSHEET.md / CHEATSHEET.fr.md
└── QUIZ.md / QUIZ.fr.md
```

To keep each example readable from top to bottom, all the classes of a version live in a single file. In a real project, you would put one class per file.

## License

[MIT](LICENSE)
