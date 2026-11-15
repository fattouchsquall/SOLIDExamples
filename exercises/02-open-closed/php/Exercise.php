<?php

declare(strict_types=1);

namespace Solid\Exercises\OpenClosed\Exercise;

use InvalidArgumentException;

final class ReportExporter
{
    /**
     * @param list<array{product: string, sales: int}> $rows
     */
    public function export(string $format, array $rows): string
    {
        return match ($format) {
            'csv' => implode("\n", [
                'product,sales',
                ...array_map(fn (array $row): string => "{$row['product']},{$row['sales']}", $rows),
            ]),
            'json' => json_encode($rows, JSON_THROW_ON_ERROR),
            'html' => implode("\n", [
                '<table>',
                '<tr><th>product</th><th>sales</th></tr>',
                ...array_map(
                    fn (array $row): string => "<tr><td>{$row['product']}</td><td>{$row['sales']}</td></tr>",
                    $rows,
                ),
                '</table>',
            ]),
            default => throw new InvalidArgumentException("Unsupported format: {$format}"),
        };
    }
}
