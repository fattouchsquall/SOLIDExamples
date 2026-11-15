<?php

declare(strict_types=1);

namespace Solid\OpenClosed\Good;

use InvalidArgumentException;

interface DiscountPolicy
{
    public function discount(float $amount): float;
}

final class RegularDiscount implements DiscountPolicy
{
    public function discount(float $amount): float
    {
        return 0.0;
    }
}

final class PremiumDiscount implements DiscountPolicy
{
    public function discount(float $amount): float
    {
        return $amount * 0.1;
    }
}

final class VipDiscount implements DiscountPolicy
{
    public function discount(float $amount): float
    {
        return min($amount * 0.2, 50.0);
    }
}

final class DiscountCalculator
{
    /**
     * @param array<string, DiscountPolicy> $policies
     */
    public function __construct(private readonly array $policies)
    {
    }

    public function discountFor(string $customerType, float $amount): float
    {
        $policy = $this->policies[$customerType]
            ?? throw new InvalidArgumentException("Unknown customer type: {$customerType}");

        return $policy->discount($amount);
    }
}
