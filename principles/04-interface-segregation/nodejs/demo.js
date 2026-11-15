import { SimplePrinter as BadSimplePrinter, printReport as badPrintReport } from './bad.js';
import { AllInOnePrinter, SimplePrinter, archive, printReport } from './good.js';

console.log('--- Before: every machine must have print, scan and fax ---');
const badPrinter = new BadSimplePrinter();
console.log(badPrintReport(badPrinter, 'Q3 report'));
try {
  badPrinter.scan();
} catch (error) {
  console.log(`Runtime error: ${error.message}`);
}

console.log('\n--- After: each class only has the methods it supports ---');
const simplePrinter = new SimplePrinter();
const allInOne = new AllInOnePrinter();
console.log(printReport(simplePrinter, 'Q3 report'));
console.log(printReport(allInOne, 'Q3 report'));
console.log(archive(allInOne, 'Signed contract'));
console.log(`SimplePrinter has a scan method: ${'scan' in simplePrinter}`);
