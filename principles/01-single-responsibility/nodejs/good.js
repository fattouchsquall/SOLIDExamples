import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

export class Invoice {
  constructor(number, customer, lines) {
    this.number = number;
    this.customer = customer;
    this.lines = lines;
  }
}

export class InvoiceCalculator {
  constructor(vatRate) {
    this.vatRate = vatRate;
  }

  subtotal(invoice) {
    return invoice.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  }

  vat(invoice) {
    return this.subtotal(invoice) * this.vatRate;
  }

  total(invoice) {
    return this.subtotal(invoice) + this.vat(invoice);
  }
}

export class InvoiceTextFormatter {
  constructor(calculator) {
    this.calculator = calculator;
  }

  format(invoice) {
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
  constructor(directory) {
    this.directory = directory;
  }

  save(invoice, content) {
    const path = join(this.directory, `${invoice.number}.txt`);
    writeFileSync(path, content);

    return path;
  }
}
