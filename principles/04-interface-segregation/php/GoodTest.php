<?php

declare(strict_types=1);

namespace Solid\InterfaceSegregation\Tests;

require_once __DIR__ . '/Good.php';

use PHPUnit\Framework\TestCase;
use Solid\InterfaceSegregation\Good\AllInOnePrinter;
use Solid\InterfaceSegregation\Good\Printer;
use Solid\InterfaceSegregation\Good\Scanner;
use Solid\InterfaceSegregation\Good\SimplePrinter;

use function Solid\InterfaceSegregation\Good\archive;
use function Solid\InterfaceSegregation\Good\printReport;

final class GoodTest extends TestCase
{
    public function testASimplePrinterOnlyImplementsWhatItCanDo(): void
    {
        $simplePrinter = new SimplePrinter();

        self::assertSame('Printing "Q3 report"', printReport($simplePrinter, 'Q3 report'));
        self::assertNotInstanceOf(Scanner::class, $simplePrinter);
    }

    public function testAnAllInOnePrinterCanBeUsedAsAPrinterOrAsAScanner(): void
    {
        $allInOne = new AllInOnePrinter();

        self::assertSame('Printing "Q3 report"', printReport($allInOne, 'Q3 report'));
        self::assertSame('Scanning "Signed contract"', archive($allInOne, 'Signed contract'));
    }

    public function testAFakePrinterForTestsOnlyNeedsOneMethod(): void
    {
        $fakePrinter = new class implements Printer {
            /** @var list<string> */
            public array $printed = [];

            public function print(string $document): string
            {
                $this->printed[] = $document;

                return 'ok';
            }
        };

        printReport($fakePrinter, 'Q3 report');

        self::assertSame(['Q3 report'], $fakePrinter->printed);
    }
}
