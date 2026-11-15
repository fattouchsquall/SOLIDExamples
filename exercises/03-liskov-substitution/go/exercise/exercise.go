package exercise

import "errors"

type Account interface {
	Balance() float64
	Deposit(amount float64)
	Withdraw(amount float64) error
}

type BankAccount struct {
	funds float64
}

func NewBankAccount(initialBalance float64) *BankAccount {
	return &BankAccount{funds: initialBalance}
}

func (a *BankAccount) Balance() float64 {
	return a.funds
}

func (a *BankAccount) Deposit(amount float64) {
	a.funds += amount
}

func (a *BankAccount) Withdraw(amount float64) error {
	if amount > a.funds {
		return errors.New("insufficient funds")
	}

	a.funds -= amount

	return nil
}

type LockedSavingsAccount struct {
	BankAccount
}

func NewLockedSavingsAccount(initialBalance float64) *LockedSavingsAccount {
	return &LockedSavingsAccount{BankAccount{funds: initialBalance}}
}

func (a *LockedSavingsAccount) AddInterest(rate float64) {
	a.funds += a.funds * rate
}

func (a *LockedSavingsAccount) Withdraw(amount float64) error {
	return errors.New("withdrawals are locked until maturity")
}

func ChargeMonthlyFee(accounts []Account, fee float64) error {
	for _, account := range accounts {
		if err := account.Withdraw(fee); err != nil {
			return err
		}
	}

	return nil
}
