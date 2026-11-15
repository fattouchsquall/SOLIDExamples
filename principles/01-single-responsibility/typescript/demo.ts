import { tmpdir } from 'node:os';
import { Invoice as BadInvoice } from './bad.ts';
import { Invoice, InvoiceCalculator, InvoiceFileStorage, InvoiceTextFormatter } from './good.ts';

const lines = [
  { label: 'Keyboard', unitPrice: 50, quantity: 2 },
  { label: 'Mouse', unitPrice: 25, quantity: 1 },
];

console.log('--- Before: one class does everything ---');
const badInvoice = new BadInvoice('INV-001', 'Alice', lines);
console.log(badInvoice.toText());
console.log(`Saved to ${badInvoice.save(tmpdir())}`);

console.log('\n--- After: one class per responsibility ---');
const invoice = new Invoice('INV-002', 'Alice', lines);
const formatter = new InvoiceTextFormatter(new InvoiceCalculator(0.2));
const storage = new InvoiceFileStorage(tmpdir());
const text = formatter.format(invoice);
console.log(text);
console.log(`Saved to ${storage.save(invoice, text)}`);
