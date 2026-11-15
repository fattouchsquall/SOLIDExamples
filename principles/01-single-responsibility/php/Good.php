<?php

declare(strict_types=1);

namespace Solid\SingleResponsibility\Good;

final class Invoice
{
    /**
     * @param list<array{label: string, unitPrice: float, quantity: int}> $lines
     */
    public function __construct(
        public readonly string $number,
        public readonly string $customer,
        public readonly array $lines,
    ) {
    }
}

final class InvoiceCalculator
{
    public function __construct(public readonly float $vatRate)
    {
    }

    public function subtotal(Invoice $invoice): float
    {
        return array_reduce(
            $invoice->lines,
            fn (float $sum, array $line): float => $sum + $line['unitPrice'] * $line['quantity'],
            0.0,
        );
    }

    public function vat(Invoice $invoice): float
    {
        return $this->subtotal($invoice) * $this->vatRate;
    }

    public function total(Invoice $invoice): float
    {
        return $this->subtotal($invoice) + $this->vat($invoice);
    }
}

final class InvoiceTextFormatter
{
    public function __construct(private readonly InvoiceCalculator $calculator)
    {
    }

    public function format(Invoice $invoice): string
    {
        $rows = array_map(
            fn (array $line): string => sprintf(
                '  %s x%d: %.2f €',
                $line['label'],
                $line['quantity'],
                $line['unitPrice'] * $line['quantity'],
            ),
            $invoice->lines,
        );

        return implode("\n", [
            sprintf('Invoice %s for %s', $invoice->number, $invoice->customer),
            ...$rows,
            sprintf('Subtotal: %.2f €', $this->calculator->subtotal($invoice)),
            sprintf('VAT: %.2f €', $this->calculator->vat($invoice)),
            sprintf('Total: %.2f €', $this->calculator->total($invoice)),
        ]);
    }
}

final class InvoiceFileStorage
{
    public function __construct(private readonly string $directory)
    {
    }

    public function save(Invoice $invoice, string $content): string
    {
        $path = $this->directory . DIRECTORY_SEPARATOR . $invoice->number . '.txt';
        file_put_contents($path, $content);

        return $path;
    }
}
