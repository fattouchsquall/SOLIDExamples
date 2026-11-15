export interface Machine {
  print(document: string): string;
  scan(document: string): string;
  fax(document: string, phoneNumber: string): string;
}

export class AllInOnePrinter implements Machine {
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

export class SimplePrinter implements Machine {
  print(document: string): string {
    return `Printing "${document}"`;
  }

  scan(): string {
    throw new Error('SimplePrinter cannot scan');
  }

  fax(): string {
    throw new Error('SimplePrinter cannot fax');
  }
}

export function printReport(machine: Machine, report: string): string {
  return machine.print(report);
}
