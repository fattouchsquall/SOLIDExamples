export interface Printer {
  print(document: string): string;
}

export interface Scanner {
  scan(document: string): string;
}

export interface Fax {
  fax(document: string, phoneNumber: string): string;
}

export class AllInOnePrinter implements Printer, Scanner, Fax {
  print(document: string): string {
    return `Printing "${document}"`;
  }

  scan(document: string): string {
    return `Scanning "${document}"`;
  }

  fax(document: string, phoneNumber: string): string {
    return `Faxing "${document}" to ${phoneNumber}`;
  }
}

export class SimplePrinter implements Printer {
  print(document: string): string {
    return `Printing "${document}"`;
  }
}

export function printReport(printer: Printer, report: string): string {
  return printer.print(report);
}

export function archive(scanner: Scanner, document: string): string {
  return scanner.scan(document);
}
