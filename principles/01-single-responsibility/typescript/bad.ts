import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

export type InvoiceLine = { label: string; unitPrice: number; quantity: number };

export class Invoice {
  readonly number: string;
  readonly customer: string;
  readonly lines: InvoiceLine[];

  constructor(number: string, customer: string, lines: InvoiceLine[]) {
    this.number = number;
    this.customer = customer;
    this.lines = lines;
  }

  subtotal(): number {
    return this.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  }

  vat(): number {
    return this.subtotal() * 0.2;
  }

  total(): number {
    return this.subtotal() + this.vat();
  }

  toText(): string {
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

  save(directory: string): string {
    const path = join(directory, `${this.number}.txt`);
    writeFileSync(path, this.toText());

    return path;
  }
}
