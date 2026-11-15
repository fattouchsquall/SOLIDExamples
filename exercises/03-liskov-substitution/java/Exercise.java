import java.util.List;

public final class Exercise {
    private Exercise() {
    }

    public static class BankAccount {
        protected double funds;

        public BankAccount(double initialBalance) {
            this.funds = initialBalance;
        }

        public double balance() {
            return funds;
        }

        public void deposit(double amount) {
            funds += amount;
        }

        public void withdraw(double amount) {
            if (amount > funds) {
                throw new IllegalStateException("Insufficient funds");
            }

            funds -= amount;
        }
    }

    public static final class LockedSavingsAccount extends BankAccount {
        public LockedSavingsAccount(double initialBalance) {
            super(initialBalance);
        }

        public void addInterest(double rate) {
            funds += funds * rate;
        }

        @Override
        public void withdraw(double amount) {
            throw new UnsupportedOperationException("Withdrawals are locked until maturity");
        }
    }

    public static void chargeMonthlyFee(List<? extends BankAccount> accounts, double fee) {
        for (BankAccount account : accounts) {
            account.withdraw(fee);
        }
    }
}
