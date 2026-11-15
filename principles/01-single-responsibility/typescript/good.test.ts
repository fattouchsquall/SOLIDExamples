import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { Invoice, InvoiceCalculator, InvoiceTextFormatter } from './good.ts';

const invoice = new Invoice('INV-001', 'Alice', [
  { label: 'Keyboard', unitPrice: 50, quantity: 2 },
  { label: 'Mouse', unitPrice: 25, quantity: 1 },
]);

describe('SRP - TypeScript', () => {
  test('the calculator only does the math', () => {
    const calculator = new InvoiceCalculator(0.2);

    assert.equal(calculator.subtotal(invoice), 125);
    assert.equal(calculator.vat(invoice), 25);
    assert.equal(calculator.total(invoice), 150);
  });

  test('a new VAT rate only needs a new calculator', () => {
    assert.equal(new InvoiceCalculator(0.1).total(invoice), 137.5);
  });

  test('the formatter renders text without touching the disk', () => {
    const text = new InvoiceTextFormatter(new InvoiceCalculator(0.2)).format(invoice);

    assert.match(text, /^Invoice INV-001 for Alice/);
    assert.match(text, /Total: 150\.00 €$/);
  });
});
