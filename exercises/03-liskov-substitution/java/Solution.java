import java.util.List;

public final class Solution {
    private Solution() {
    }

    public abstract static class Account {
        protected double funds;

        protected Account(double initialBalance) {
            this.funds = initialBalance;
        }

        public double balance() {
            return funds;
        }

        public void deposit(double amount) {
            funds += amount;
        }
    }

    public static final class CheckingAccount extends Account {
        public CheckingAccount(double initialBalance) {
            super(initialBalance);
        }

        public void withdraw(double amount) {
            if (amount > funds) {
                throw new IllegalStateException("Insufficient funds");
            }

            funds -= amount;
        }
    }

    public static final class LockedSavingsAccount extends Account {
        public LockedSavingsAccount(double initialBalance) {
            super(initialBalance);
        }

        public void addInterest(double rate) {
            funds += funds * rate;
        }
    }

    public static void chargeMonthlyFee(List<CheckingAccount> accounts, double fee) {
        for (CheckingAccount account : accounts) {
            account.withdraw(fee);
        }
    }

    public static double totalBalance(List<? extends Account> accounts) {
        return accounts.stream().mapToDouble(Account::balance).sum();
    }
}
