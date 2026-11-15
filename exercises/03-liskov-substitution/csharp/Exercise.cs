namespace Solid.Exercises.LiskovSubstitution.Exercise;

public class BankAccount
{
    protected decimal _funds;

    public BankAccount(decimal initialBalance)
    {
        _funds = initialBalance;
    }

    public decimal Balance() => _funds;

    public void Deposit(decimal amount)
    {
        _funds += amount;
    }

    public virtual void Withdraw(decimal amount)
    {
        if (amount > _funds)
        {
            throw new InvalidOperationException("Insufficient funds");
        }

        _funds -= amount;
    }
}

public sealed class LockedSavingsAccount : BankAccount
{
    public LockedSavingsAccount(decimal initialBalance)
        : base(initialBalance)
    {
    }

    public void AddInterest(decimal rate)
    {
        _funds += _funds * rate;
    }

    public override void Withdraw(decimal amount)
    {
        throw new NotSupportedException("Withdrawals are locked until maturity");
    }
}

public static class Fees
{
    public static void ChargeMonthlyFee(IEnumerable<BankAccount> accounts, decimal fee)
    {
        foreach (var account in accounts)
        {
            account.Withdraw(fee);
        }
    }
}
