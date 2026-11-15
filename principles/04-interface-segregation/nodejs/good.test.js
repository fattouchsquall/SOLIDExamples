import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { AllInOnePrinter, SimplePrinter, archive, printReport } from './good.js';

describe('ISP - Node.js', () => {
  test('a simple printer only implements what it can do', () => {
    assert.equal(printReport(new SimplePrinter(), 'Q3 report'), 'Printing "Q3 report"');
    assert.equal('scan' in new SimplePrinter(), false);
  });

  test('an all-in-one printer can be used as a printer or as a scanner', () => {
    const allInOne = new AllInOnePrinter();

    assert.equal(printReport(allInOne, 'Q3 report'), 'Printing "Q3 report"');
    assert.equal(archive(allInOne, 'Signed contract'), 'Scanning "Signed contract"');
  });

  test('a fake printer for tests only needs one method', () => {
    const printed = [];
    const fakePrinter = {
      print(document) {
        printed.push(document);
        return 'ok';
      },
    };

    printReport(fakePrinter, 'Q3 report');

    assert.deepEqual(printed, ['Q3 report']);
  });
});
