# Exercise 2 — Open/Closed

> 🇫🇷 [Lire en français](README.fr.md)

📖 Principle: [Open/Closed Principle](../../principles/02-open-closed)

## The situation

A `ReportExporter` turns a list of sales into a file, in CSV, JSON or HTML. Open the starting code in your language:

- [`typescript/exercise.ts`](typescript/exercise.ts)
- [`nodejs/exercise.js`](nodejs/exercise.js)
- [`php/Exercise.php`](php/Exercise.php)

Today, a colleague asks for a **Markdown** export to paste reports into the wiki. Next month, someone will surely ask for XML, then Excel…

## Your mission

1. Refactor `ReportExporter` so that adding a new format **does not require modifying it**.
2. Then add the Markdown format, which must produce:

```
| product | sales |
|---|---|
| Keyboard | 120 |
| Mouse | 80 |
```

3. CSV, JSON and HTML must produce exactly the same output as before.
4. An unknown format must still throw `Unsupported format: <format>`.

## Done when

- [ ] Adding Markdown only meant **creating** code, not editing `ReportExporter`.
- [ ] Each format can be tested on its own.
- [ ] There is no more `switch` or `match` on the format.

## Hints

<details>
<summary>Hint 1: what is the common contract?</summary>

Every format takes the same input (a list of rows) and returns the same kind of output (a string). That's an interface with a single method: `export(rows)`.
</details>

<details>
<summary>Hint 2: how does ReportExporter find the right format?</summary>

Give it a map from format name to exporter, through its constructor: `{ csv: new CsvExporter(), json: new JsonExporter(), ... }`. It looks up the format in the map and delegates.
</details>

<details>
<summary>Hint 3: who decides which formats exist?</summary>

The code that **creates** the `ReportExporter`. Adding a format means adding one line there, plus the new class.
</details>

## Try it

```ts
import { ReportExporter } from './exercise.ts';

const rows = [
  { product: 'Keyboard', sales: 120 },
  { product: 'Mouse', sales: 80 },
];

console.log(new ReportExporter().export('csv', rows));
```

## Solution

Try on your own first! Then compare with:

- [`typescript/solution.ts`](typescript/solution.ts)
- [`nodejs/solution.js`](nodejs/solution.js)
- [`php/Solution.php`](php/Solution.php)

⬅️ Previous exercise: [Single Responsibility](../01-single-responsibility) · ➡️ Next exercise: [Liskov Substitution](../03-liskov-substitution)
