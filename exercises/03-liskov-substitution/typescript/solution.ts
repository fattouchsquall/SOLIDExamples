export abstract class Account {
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
}

export class CheckingAccount extends Account {
  withdraw(amount: number): void {
    if (amount > this.funds) {
      throw new Error('Insufficient funds');
    }

    this.funds -= amount;
  }
}

export class LockedSavingsAccount extends Account {
  addInterest(rate: number): void {
    this.funds += this.funds * rate;
  }
}

export function chargeMonthlyFee(accounts: CheckingAccount[], fee: number): void {
  for (const account of accounts) {
    account.withdraw(fee);
  }
}

export function totalBalance(accounts: Account[]): number {
  return accounts.reduce((sum, account) => sum + account.balance(), 0);
}
