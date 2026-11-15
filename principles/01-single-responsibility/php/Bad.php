<?php

declare(strict_types=1);

namespace Solid\SingleResponsibility\Bad;

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

    public function subtotal(): float
    {
        return array_reduce(
            $this->lines,
            fn (float $sum, array $line): float => $sum + $line['unitPrice'] * $line['quantity'],
            0.0,
        );
    }

    public function vat(): float
    {
        return $this->subtotal() * 0.2;
    }

    public function total(): float
    {
        return $this->subtotal() + $this->vat();
    }

    public function toText(): string
    {
        $rows = array_map(
            fn (array $line): string => sprintf(
                '  %s x%d: %.2f €',
                $line['label'],
                $line['quantity'],
                $line['unitPrice'] * $line['quantity'],
            ),
            $this->lines,
        );

        return implode("\n", [
            sprintf('Invoice %s for %s', $this->number, $this->customer),
            ...$rows,
            sprintf('Subtotal: %.2f €', $this->subtotal()),
            sprintf('VAT: %.2f €', $this->vat()),
            sprintf('Total: %.2f €', $this->total()),
        ]);
    }

    public function save(string $directory): string
    {
        $path = $directory . DIRECTORY_SEPARATOR . $this->number . '.txt';
        file_put_contents($path, $this->toText());

        return $path;
    }
}
