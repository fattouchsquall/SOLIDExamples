<?php

declare(strict_types=1);

require_once __DIR__ . '/Bad.php';
require_once __DIR__ . '/Good.php';

use Solid\SingleResponsibility\Bad\Invoice as BadInvoice;
use Solid\SingleResponsibility\Good\Invoice;
use Solid\SingleResponsibility\Good\InvoiceCalculator;
use Solid\SingleResponsibility\Good\InvoiceFileStorage;
use Solid\SingleResponsibility\Good\InvoiceTextFormatter;

$lines = [
    ['label' => 'Keyboard', 'unitPrice' => 50.0, 'quantity' => 2],
    ['label' => 'Mouse', 'unitPrice' => 25.0, 'quantity' => 1],
];

echo "--- Before: one class does everything ---\n";
$badInvoice = new BadInvoice('INV-001', 'Alice', $lines);
echo $badInvoice->toText(), "\n";
echo 'Saved to ', $badInvoice->save(sys_get_temp_dir()), "\n";

echo "\n--- After: one class per responsibility ---\n";
$invoice = new Invoice('INV-002', 'Alice', $lines);
$formatter = new InvoiceTextFormatter(new InvoiceCalculator(0.2));
$storage = new InvoiceFileStorage(sys_get_temp_dir());
$text = $formatter->format($invoice);
echo $text, "\n";
echo 'Saved to ', $storage->save($invoice, $text), "\n";
