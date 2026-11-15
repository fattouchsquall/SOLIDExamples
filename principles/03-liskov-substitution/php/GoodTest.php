<?php

declare(strict_types=1);

namespace Solid\LiskovSubstitution\Tests;

require_once __DIR__ . '/Good.php';

use PHPUnit\Framework\TestCase;
use Solid\LiskovSubstitution\Good\Rectangle;
use Solid\LiskovSubstitution\Good\Shape;
use Solid\LiskovSubstitution\Good\Square;

use function Solid\LiskovSubstitution\Good\totalArea;

final class GoodTest extends TestCase
{
    public function testEachShapeComputesItsOwnArea(): void
    {
        self::assertSame(20.0, (new Rectangle(4, 5))->area());
        self::assertSame(25.0, (new Square(5))->area());
    }

    public function testTotalAreaWorksWithAnyShape(): void
    {
        self::assertSame(45.0, totalArea([new Rectangle(4, 5), new Square(5)]));
    }

    public function testANewShapeCanBeSubstitutedWithoutChangingTotalArea(): void
    {
        $triangle = new class (4, 3) implements Shape {
            public function __construct(
                public readonly float $base,
                public readonly float $height,
            ) {
            }

            public function area(): float
            {
                return $this->base * $this->height / 2;
            }
        };

        self::assertSame(10.0, totalArea([new Square(2), $triangle]));
    }
}
