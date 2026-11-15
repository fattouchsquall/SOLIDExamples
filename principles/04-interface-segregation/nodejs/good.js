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
}

export function printReport(printer, report) {
  return printer.print(report);
}

export function archive(scanner, document) {
  return scanner.scan(document);
}
