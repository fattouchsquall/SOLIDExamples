export class BankAccount {
  constructor(initialBalance) {
    this.funds = initialBalance;
  }

  balance() {
    return this.funds;
  }

  deposit(amount) {
    this.funds += amount;
  }

  withdraw(amount) {
    if (amount > this.funds) {
      throw new Error('Insufficient funds');
    }

    this.funds -= amount;
  }
}

export class LockedSavingsAccount extends BankAccount {
  addInterest(rate) {
    this.funds += this.funds * rate;
  }

  withdraw() {
    throw new Error('Withdrawals are locked until maturity');
  }
}

export function chargeMonthlyFee(accounts, fee) {
  for (const account of accounts) {
    account.withdraw(fee);
  }
}
