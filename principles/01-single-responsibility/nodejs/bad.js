import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

export class Invoice {
  constructor(number, customer, lines) {
    this.number = number;
    this.customer = customer;
    this.lines = lines;
  }

  subtotal() {
    return this.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  }

  vat() {
    return this.subtotal() * 0.2;
  }

  total() {
    return this.subtotal() + this.vat();
  }

  toText() {
    const rows = this.lines.map(
      (line) => `  ${line.label} x${line.quantity}: ${(line.unitPrice * line.quantity).toFixed(2)} €`,
    );

    return [
      `Invoice ${this.number} for ${this.customer}`,
      ...rows,
      `Subtotal: ${this.subtotal().toFixed(2)} €`,
      `VAT: ${this.vat().toFixed(2)} €`,
      `Total: ${this.total().toFixed(2)} €`,
    ].join('\n');
  }

  save(directory) {
    const path = join(directory, `${this.number}.txt`);
    writeFileSync(path, this.toText());

    return path;
  }
}
