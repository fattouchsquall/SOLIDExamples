<?php

declare(strict_types=1);

namespace Solid\Exercises\LiskovSubstitution\Solution;

use DomainException;

abstract class Account
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
}

final class CheckingAccount extends Account
{
    public function withdraw(float $amount): void
    {
        if ($amount > $this->funds) {
            throw new DomainException('Insufficient funds');
        }

        $this->funds -= $amount;
    }
}

final class LockedSavingsAccount extends Account
{
    public function addInterest(float $rate): void
    {
        $this->funds += $this->funds * $rate;
    }
}

/**
 * @param list<CheckingAccount> $accounts
 */
function chargeMonthlyFee(array $accounts, float $fee): void
{
    foreach ($accounts as $account) {
        $account->withdraw($fee);
    }
}

/**
 * @param list<Account> $accounts
 */
function totalBalance(array $accounts): float
{
    return array_reduce($accounts, fn (float $sum, Account $account): float => $sum + $account->balance(), 0.0);
}
