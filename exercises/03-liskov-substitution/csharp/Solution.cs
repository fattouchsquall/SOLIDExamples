namespace Solid.Exercises.LiskovSubstitution.Solution;

public abstract class Account
{
    protected decimal _funds;

    protected Account(decimal initialBalance)
    {
        _funds = initialBalance;
    }

    public decimal Balance() => _funds;

    public void Deposit(decimal amount)
    {
        _funds += amount;
    }
}

public sealed class CheckingAccount : Account
{
    public CheckingAccount(decimal initialBalance)
        : base(initialBalance)
    {
    }

    public void Withdraw(decimal amount)
    {
        if (amount > _funds)
        {
            throw new InvalidOperationException("Insufficient funds");
        }

        _funds -= amount;
    }
}

public sealed class LockedSavingsAccount : Account
{
    public LockedSavingsAccount(decimal initialBalance)
        : base(initialBalance)
    {
    }

    public void AddInterest(decimal rate)
    {
        _funds += _funds * rate;
    }
}

public static class Fees
{
    public static void ChargeMonthlyFee(IEnumerable<CheckingAccount> accounts, decimal fee)
    {
        foreach (var account in accounts)
        {
            account.Withdraw(fee);
        }
    }

    public static decimal TotalBalance(IEnumerable<Account> accounts) => accounts.Sum(account => account.Balance());
}
