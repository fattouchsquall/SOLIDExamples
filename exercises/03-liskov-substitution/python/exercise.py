class BankAccount:
    def __init__(self, initial_balance: float) -> None:
        self._funds = initial_balance

    def balance(self) -> float:
        return self._funds

    def deposit(self, amount: float) -> None:
        self._funds += amount

    def withdraw(self, amount: float) -> None:
        if amount > self._funds:
            raise ValueError("Insufficient funds")

        self._funds -= amount


class LockedSavingsAccount(BankAccount):
    def add_interest(self, rate: float) -> None:
        self._funds += self._funds * rate

    def withdraw(self, amount: float) -> None:
        raise RuntimeError("Withdrawals are locked until maturity")


def charge_monthly_fee(accounts: list[BankAccount], fee: float) -> None:
    for account in accounts:
        account.withdraw(fee)
