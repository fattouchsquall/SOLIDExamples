<?php

declare(strict_types=1);

namespace Solid\OpenClosed\Tests;

require_once __DIR__ . '/Good.php';

use InvalidArgumentException;
use PHPUnit\Framework\TestCase;
use Solid\OpenClosed\Good\DiscountCalculator;
use Solid\OpenClosed\Good\DiscountPolicy;
use Solid\OpenClosed\Good\PremiumDiscount;
use Solid\OpenClosed\Good\RegularDiscount;
use Solid\OpenClosed\Good\VipDiscount;

final class GoodTest extends TestCase
{
    public function testEachPolicyCanBeTestedOnItsOwn(): void
    {
        self::assertSame(0.0, (new RegularDiscount())->discount(400.0));
        self::assertSame(40.0, (new PremiumDiscount())->discount(400.0));
        self::assertSame(20.0, (new VipDiscount())->discount(100.0));
        self::assertSame(50.0, (new VipDiscount())->discount(400.0));
    }

    public function testANewCustomerTypeIsAddedWithoutModifyingTheCalculator(): void
    {
        $employeeDiscount = new class implements DiscountPolicy {
            public function discount(float $amount): float
            {
                return $amount * 0.3;
            }
        };

        $calculator = new DiscountCalculator(['employee' => $employeeDiscount]);

        self::assertSame(120.0, $calculator->discountFor('employee', 400.0));
    }

    public function testAnUnknownCustomerTypeIsRejected(): void
    {
        $calculator = new DiscountCalculator(['regular' => new RegularDiscount()]);

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Unknown customer type: gold');

        $calculator->discountFor('gold', 400.0);
    }
}
