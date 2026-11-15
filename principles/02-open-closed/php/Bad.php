<?php

declare(strict_types=1);

namespace Solid\OpenClosed\Bad;

use InvalidArgumentException;

final class DiscountCalculator
{
    public function discountFor(string $customerType, float $amount): float
    {
        return match ($customerType) {
            'regular' => 0.0,
            'premium' => $amount * 0.1,
            'vip' => min($amount * 0.2, 50.0),
            default => throw new InvalidArgumentException("Unknown customer type: {$customerType}"),
        };
    }
}
