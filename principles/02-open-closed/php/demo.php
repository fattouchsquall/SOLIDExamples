<?php

declare(strict_types=1);

require_once __DIR__ . '/Bad.php';
require_once __DIR__ . '/Good.php';

use Solid\OpenClosed\Bad\DiscountCalculator as BadDiscountCalculator;
use Solid\OpenClosed\Good\DiscountCalculator;
use Solid\OpenClosed\Good\DiscountPolicy;
use Solid\OpenClosed\Good\PremiumDiscount;
use Solid\OpenClosed\Good\RegularDiscount;
use Solid\OpenClosed\Good\VipDiscount;

final class EmployeeDiscount implements DiscountPolicy
{
    public function discount(float $amount): float
    {
        return $amount * 0.3;
    }
}

$amount = 400.0;

echo "--- Before: a match that must be edited for every new customer type ---\n";
$badCalculator = new BadDiscountCalculator();
foreach (['regular', 'premium', 'vip'] as $customerType) {
    printf("%s: -%.2f €\n", $customerType, $badCalculator->discountFor($customerType, $amount));
}

echo "\n--- After: one policy per customer type ---\n";
$calculator = new DiscountCalculator([
    'regular' => new RegularDiscount(),
    'premium' => new PremiumDiscount(),
    'vip' => new VipDiscount(),
    'employee' => new EmployeeDiscount(),
]);
foreach (['regular', 'premium', 'vip', 'employee'] as $customerType) {
    printf("%s: -%.2f €\n", $customerType, $calculator->discountFor($customerType, $amount));
}
echo "The \"employee\" discount was added without touching Good.php\n";
