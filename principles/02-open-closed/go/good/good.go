package good

import (
	"fmt"
	"math"
)

type DiscountPolicy interface {
	Discount(amount float64) float64
}

type RegularDiscount struct{}

func (RegularDiscount) Discount(amount float64) float64 {
	return 0
}

type PremiumDiscount struct{}

func (PremiumDiscount) Discount(amount float64) float64 {
	return amount * 0.1
}

type VipDiscount struct{}

func (VipDiscount) Discount(amount float64) float64 {
	return math.Min(amount*0.2, 50)
}

type DiscountCalculator struct {
	Policies map[string]DiscountPolicy
}

func (c DiscountCalculator) DiscountFor(customerType string, amount float64) (float64, error) {
	policy, found := c.Policies[customerType]
	if !found {
		return 0, fmt.Errorf("unknown customer type: %s", customerType)
	}

	return policy.Discount(amount), nil
}
