export class AllInOnePrinter {
  print(document) {
    return `Printing "${document}"`;
  }

  scan(document) {
    return `Scanning "${document}"`;
  }

  fax(document, phoneNumber) {
    return `Faxing "${document}" to ${phoneNumber}`;
  }
}

export class SimplePrinter {
  print(document) {
    return `Printing "${document}"`;
  }

  scan() {
    throw new Error('SimplePrinter cannot scan');
  }

  fax() {
    throw new Error('SimplePrinter cannot fax');
  }
}

export function printReport(machine, report) {
  return machine.print(report);
}
