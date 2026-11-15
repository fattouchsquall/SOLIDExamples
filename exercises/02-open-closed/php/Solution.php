<?php

declare(strict_types=1);

namespace Solid\Exercises\OpenClosed\Solution;

use InvalidArgumentException;

interface Exporter
{
    /**
     * @param list<array{product: string, sales: int}> $rows
     */
    public function export(array $rows): string;
}

final class CsvExporter implements Exporter
{
    public function export(array $rows): string
    {
        return implode("\n", [
            'product,sales',
            ...array_map(fn (array $row): string => "{$row['product']},{$row['sales']}", $rows),
        ]);
    }
}

final class JsonExporter implements Exporter
{
    public function export(array $rows): string
    {
        return json_encode($rows, JSON_THROW_ON_ERROR);
    }
}

final class HtmlExporter implements Exporter
{
    public function export(array $rows): string
    {
        return implode("\n", [
            '<table>',
            '<tr><th>product</th><th>sales</th></tr>',
            ...array_map(
                fn (array $row): string => "<tr><td>{$row['product']}</td><td>{$row['sales']}</td></tr>",
                $rows,
            ),
            '</table>',
        ]);
    }
}

final class MarkdownExporter implements Exporter
{
    public function export(array $rows): string
    {
        return implode("\n", [
            '| product | sales |',
            '|---|---|',
            ...array_map(fn (array $row): string => "| {$row['product']} | {$row['sales']} |", $rows),
        ]);
    }
}

final class ReportExporter
{
    /**
     * @param array<string, Exporter> $exporters
     */
    public function __construct(private readonly array $exporters)
    {
    }

    /**
     * @param list<array{product: string, sales: int}> $rows
     */
    public function export(string $format, array $rows): string
    {
        $exporter = $this->exporters[$format]
            ?? throw new InvalidArgumentException("Unsupported format: {$format}");

        return $exporter->export($rows);
    }
}
