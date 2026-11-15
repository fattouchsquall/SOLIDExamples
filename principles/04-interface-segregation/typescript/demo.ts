import { SimplePrinter as BadSimplePrinter, printReport as badPrintReport } from './bad.ts';
import { AllInOnePrinter, SimplePrinter, archive, printReport } from './good.ts';

console.log('--- Before: one big Machine interface ---');
const badPrinter = new BadSimplePrinter();
console.log(badPrintReport(badPrinter, 'Q3 report'));
try {
  badPrinter.scan();
} catch (error) {
  console.log(`Runtime error: ${(error as Error).message}`);
}

console.log('\n--- After: small Printer, Scanner and Fax interfaces ---');
const simplePrinter = new SimplePrinter();
const allInOne = new AllInOnePrinter();
console.log(printReport(simplePrinter, 'Q3 report'));
console.log(printReport(allInOne, 'Q3 report'));
console.log(archive(allInOne, 'Signed contract'));
console.log('archive(simplePrinter, ...) does not even compile: SimplePrinter is not a Scanner');
