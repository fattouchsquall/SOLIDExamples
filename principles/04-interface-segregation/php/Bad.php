<?php

declare(strict_types=1);

namespace Solid\InterfaceSegregation\Bad;

use BadMethodCallException;

interface Machine
{
    public function print(string $document): string;

    public function scan(string $document): string;

    public function fax(string $document, string $phoneNumber): string;
}

final class AllInOnePrinter implements Machine
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

final class SimplePrinter implements Machine
{
    public function print(string $document): string
    {
        return "Printing \"{$document}\"";
    }

    public function scan(string $document): string
    {
        throw new BadMethodCallException('SimplePrinter cannot scan');
    }

    public function fax(string $document, string $phoneNumber): string
    {
        throw new BadMethodCallException('SimplePrinter cannot fax');
    }
}

function printReport(Machine $machine, string $report): string
{
    return $machine->print($report);
}
