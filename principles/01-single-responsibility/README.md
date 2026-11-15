# S — Single Responsibility Principle (SRP)

> 🇫🇷 [Lire en français](README.fr.md)

> **A class should have one, and only one, reason to change.**
> — Robert C. Martin

## In plain words

A "responsibility" is not "one method" or "one thing the class does". It is **one reason to change**, which usually means **one person or team that can ask you to change it**.

If the accountant, the designer and the ops team can all ask you to edit the same class, that class has three responsibilities.

## The problem

[`typescript/bad.ts`](typescript/bad.ts) has one `Invoice` class that does everything:

```ts
export class Invoice {
  subtotal(): number { /* ... */ }
  vat(): number { return this.subtotal() * 0.2; }   // pricing rules
  total(): number { /* ... */ }
  toText(): string { /* ... */ }                      // presentation
  save(directory: string): string { /* ... */ }       // storage
}
```

It works, but count the reasons to change:

| Who asks? | What changes? | Where? |
|---|---|---|
| The accountant | The VAT rate goes from 20% to 10% | `Invoice` |
| The designer | The invoice must be rendered as HTML | `Invoice` |
| The ops team | Invoices must be stored in S3, not on disk | `Invoice` |

Three different people, one single file. Every change risks breaking the other two features, and you cannot test the text output without also loading the file system code.

## The fix

[`typescript/good.ts`](typescript/good.ts) splits the class along those three reasons:

| Class | Responsibility | Changes when… |
|---|---|---|
| `Invoice` | Holds the data | The invoice data changes |
| `InvoiceCalculator` | Computes subtotal, VAT and total | Pricing rules change |
| `InvoiceTextFormatter` | Renders the invoice as text | The display format changes |
| `InvoiceFileStorage` | Writes the invoice to disk | The storage changes |

```ts
const invoice = new Invoice('INV-002', 'Alice', lines);
const formatter = new InvoiceTextFormatter(new InvoiceCalculator(0.2));
const storage = new InvoiceFileStorage(tmpdir());

storage.save(invoice, formatter.format(invoice));
```

Now:

- A new VAT rate is just `new InvoiceCalculator(0.1)`, nothing else moves.
- An HTML output is a new `InvoiceHtmlFormatter`, the text one stays untouched.
- The tests in [`typescript/good.test.ts`](typescript/good.test.ts) check the math and the text without writing a single file.

## Run it

```bash
node principles/01-single-responsibility/typescript/demo.ts
node principles/01-single-responsibility/nodejs/demo.js
php principles/01-single-responsibility/php/demo.php
```

Both versions print the same invoice: **the behavior did not change, only the structure did**. That is what a good refactoring looks like.

## Warning signs

- The class name ends with `Manager`, `Handler`, `Processor` or `Service` and keeps growing.
- You need the word "and" to describe what the class does.
- The file imports from very different worlds: math, HTML, file system, HTTP, database…
- Two people often edit the same file for unrelated reasons, and get merge conflicts.
- Testing a small rule forces you to set up a database or a mail server.

## Don't overdo it

SRP does not mean "one method per class". Splitting `subtotal()`, `vat()` and `total()` into three classes would make the code harder to read for no benefit: they all change for the same reason (pricing rules), so they belong together.

Ask yourself **"who would ask me to change this?"** rather than "how many things does it do?".

## Go further

- 🏋️ Exercise: [`exercises/01-single-responsibility`](../../exercises/01-single-responsibility)
- ➡️ Next principle: [Open/Closed Principle](../02-open-closed)
