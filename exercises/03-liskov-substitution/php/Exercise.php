<?php

declare(strict_types=1);

namespace Solid\Exercises\LiskovSubstitution\Exercise;

use DomainException;

class BankAccount
{
    public function __construct(protected float $funds)
    {
    }

    public function balance(): float
    {
        return $this->funds;
    }

    public function deposit(float $amount): void
    {
        $this->funds += $amount;
    }

    public function withdraw(float $amount): void
    {
        if ($amount > $this->funds) {
            throw new DomainException('Insufficient funds');
        }

        $this->funds -= $amount;
    }
}

final class LockedSavingsAccount extends BankAccount
{
    public function addInterest(float $rate): void
    {
        $this->funds += $this->funds * $rate;
    }

    public function withdraw(float $amount): void
    {
        throw new DomainException('Withdrawals are locked until maturity');
    }
}

/**
 * @param list<BankAccount> $accounts
 */
function chargeMonthlyFee(array $accounts, float $fee): void
{
    foreach ($accounts as $account) {
        $account->withdraw($fee);
    }
}
