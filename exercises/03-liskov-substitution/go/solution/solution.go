package solution

import "errors"

type Account interface {
	Balance() float64
	Deposit(amount float64)
}

type accountBase struct {
	funds float64
}

func (a *accountBase) Balance() float64 {
	return a.funds
}

func (a *accountBase) Deposit(amount float64) {
	a.funds += amount
}

type CheckingAccount struct {
	accountBase
}

func NewCheckingAccount(initialBalance float64) *CheckingAccount {
	return &CheckingAccount{accountBase{funds: initialBalance}}
}

func (a *CheckingAccount) Withdraw(amount float64) error {
	if amount > a.funds {
		return errors.New("insufficient funds")
	}

	a.funds -= amount

	return nil
}

type LockedSavingsAccount struct {
	accountBase
}

func NewLockedSavingsAccount(initialBalance float64) *LockedSavingsAccount {
	return &LockedSavingsAccount{accountBase{funds: initialBalance}}
}

func (a *LockedSavingsAccount) AddInterest(rate float64) {
	a.funds += a.funds * rate
}

func ChargeMonthlyFee(accounts []*CheckingAccount, fee float64) error {
	for _, account := range accounts {
		if err := account.Withdraw(fee); err != nil {
			return err
		}
	}

	return nil
}

func TotalBalance(accounts []Account) float64 {
	total := 0.0
	for _, account := range accounts {
		total += account.Balance()
	}

	return total
}
