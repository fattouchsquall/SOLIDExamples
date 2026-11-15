<?php

declare(strict_types=1);

namespace Solid\InterfaceSegregation\Good;

interface Printer
{
    public function print(string $document): string;
}

interface Scanner
{
    public function scan(string $document): string;
}

interface Fax
{
    public function fax(string $document, string $phoneNumber): string;
}

final class AllInOnePrinter implements Printer, Scanner, Fax
{
    public function print(string $document): string
    {
        return "Printing \"{$document}\"";
    }

    public function scan(string $document): string
    {
        return "Scanning \"{$document}\"";
    }

    public function fax(string $document, string $phoneNumber): string
    {
        return "Faxing \"{$document}\" to {$phoneNumber}";
    }
}

final class SimplePrinter implements Printer
{
    public function print(string $document): string
    {
        return "Printing \"{$document}\"";
    }
}

function printReport(Printer $printer, string $report): string
{
    return $printer->print($report);
}

function archive(Scanner $scanner, string $document): string
{
    return $scanner->scan($document);
}
