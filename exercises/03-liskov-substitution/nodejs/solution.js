export class Account {
  constructor(initialBalance) {
    this.funds = initialBalance;
  }

  balance() {
    return this.funds;
  }

  deposit(amount) {
    this.funds += amount;
  }
}

export class CheckingAccount extends Account {
  withdraw(amount) {
    if (amount > this.funds) {
      throw new Error('Insufficient funds');
    }

    this.funds -= amount;
  }
}

export class LockedSavingsAccount extends Account {
  addInterest(rate) {
    this.funds += this.funds * rate;
  }
}

export function chargeMonthlyFee(accounts, fee) {
  for (const account of accounts) {
    account.withdraw(fee);
  }
}

export function totalBalance(accounts) {
  return accounts.reduce((sum, account) => sum + account.balance(), 0);
}
