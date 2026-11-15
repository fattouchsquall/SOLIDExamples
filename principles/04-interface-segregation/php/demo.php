<?php

declare(strict_types=1);

require_once __DIR__ . '/Bad.php';
require_once __DIR__ . '/Good.php';

use Solid\InterfaceSegregation\Bad\SimplePrinter as BadSimplePrinter;
use Solid\InterfaceSegregation\Good\AllInOnePrinter;
use Solid\InterfaceSegregation\Good\Scanner;
use Solid\InterfaceSegregation\Good\SimplePrinter;

use function Solid\InterfaceSegregation\Bad\printReport as badPrintReport;
use function Solid\InterfaceSegregation\Good\archive;
use function Solid\InterfaceSegregation\Good\printReport;

echo "--- Before: one big Machine interface ---\n";
$badPrinter = new BadSimplePrinter();
echo badPrintReport($badPrinter, 'Q3 report'), "\n";
try {
    $badPrinter->scan('Signed contract');
} catch (BadMethodCallException $exception) {
    echo 'Runtime error: ', $exception->getMessage(), "\n";
}

echo "\n--- After: small Printer, Scanner and Fax interfaces ---\n";
$simplePrinter = new SimplePrinter();
$allInOne = new AllInOnePrinter();
echo printReport($simplePrinter, 'Q3 report'), "\n";
echo printReport($allInOne, 'Q3 report'), "\n";
echo archive($allInOne, 'Signed contract'), "\n";
echo 'SimplePrinter is a Scanner: ', $simplePrinter instanceof Scanner ? 'yes' : 'no', "\n";
