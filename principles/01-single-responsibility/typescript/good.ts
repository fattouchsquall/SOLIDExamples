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
}

export class InvoiceCalculator {
  readonly vatRate: number;

  constructor(vatRate: number) {
    this.vatRate = vatRate;
  }

  subtotal(invoice: Invoice): number {
    return invoice.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  }

  vat(invoice: Invoice): number {
    return this.subtotal(invoice) * this.vatRate;
  }

  total(invoice: Invoice): number {
    return this.subtotal(invoice) + this.vat(invoice);
  }
}

export class InvoiceTextFormatter {
  readonly calculator: InvoiceCalculator;

  constructor(calculator: InvoiceCalculator) {
    this.calculator = calculator;
  }

  format(invoice: Invoice): string {
    const rows = invoice.lines.map(
      (line) => `  ${line.label} x${line.quantity}: ${(line.unitPrice * line.quantity).toFixed(2)} €`,
    );

    return [
      `Invoice ${invoice.number} for ${invoice.customer}`,
      ...rows,
      `Subtotal: ${this.calculator.subtotal(invoice).toFixed(2)} €`,
      `VAT: ${this.calculator.vat(invoice).toFixed(2)} €`,
      `Total: ${this.calculator.total(invoice).toFixed(2)} €`,
    ].join('\n');
  }
}

export class InvoiceFileStorage {
  readonly directory: string;

  constructor(directory: string) {
    this.directory = directory;
  }

  save(invoice: Invoice, content: string): string {
    const path = join(this.directory, `${invoice.number}.txt`);
    writeFileSync(path, content);

    return path;
  }
}
