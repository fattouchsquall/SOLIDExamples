<?php

declare(strict_types=1);

namespace Solid\SingleResponsibility\Tests;

require_once __DIR__ . '/Good.php';

use PHPUnit\Framework\TestCase;
use Solid\SingleResponsibility\Good\Invoice;
use Solid\SingleResponsibility\Good\InvoiceCalculator;
use Solid\SingleResponsibility\Good\InvoiceTextFormatter;

final class GoodTest extends TestCase
{
    private Invoice $invoice;

    protected function setUp(): void
    {
        $this->invoice = new Invoice('INV-001', 'Alice', [
            ['label' => 'Keyboard', 'unitPrice' => 50.0, 'quantity' => 2],
            ['label' => 'Mouse', 'unitPrice' => 25.0, 'quantity' => 1],
        ]);
    }

    public function testTheCalculatorOnlyDoesTheMath(): void
    {
        $calculator = new InvoiceCalculator(0.2);

        self::assertSame(125.0, $calculator->subtotal($this->invoice));
        self::assertSame(25.0, $calculator->vat($this->invoice));
        self::assertSame(150.0, $calculator->total($this->invoice));
    }

    public function testANewVatRateOnlyNeedsANewCalculator(): void
    {
        self::assertSame(137.5, (new InvoiceCalculator(0.1))->total($this->invoice));
    }

    public function testTheFormatterRendersTextWithoutTouchingTheDisk(): void
    {
        $text = (new InvoiceTextFormatter(new InvoiceCalculator(0.2)))->format($this->invoice);

        self::assertStringStartsWith('Invoice INV-001 for Alice', $text);
        self::assertStringEndsWith('Total: 150.00 €', $text);
    }
}
