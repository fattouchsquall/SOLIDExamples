export class BankAccount {
  protected funds: number;

  constructor(initialBalance: number) {
    this.funds = initialBalance;
  }

  balance(): number {
    return this.funds;
  }

  deposit(amount: number): void {
    this.funds += amount;
  }

  withdraw(amount: number): void {
    if (amount > this.funds) {
      throw new Error('Insufficient funds');
    }

    this.funds -= amount;
  }
}

export class LockedSavingsAccount extends BankAccount {
  addInterest(rate: number): void {
    this.funds += this.funds * rate;
  }

  override withdraw(): void {
    throw new Error('Withdrawals are locked until maturity');
  }
}

export function chargeMonthlyFee(accounts: BankAccount[], fee: number): void {
  for (const account of accounts) {
    account.withdraw(fee);
  }
}
