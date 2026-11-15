package good_test

import (
	"testing"

	"github.com/fattouchsquall/SOLIDExamples/principles/02-open-closed/go/good"
)

type employeeDiscount struct{}

func (employeeDiscount) Discount(amount float64) float64 {
	return amount * 0.3
}

func TestEachPolicyCanBeTestedOnItsOwn(t *testing.T) {
	cases := []struct {
		name   string
		policy good.DiscountPolicy
		amount float64
		want   float64
	}{
		{"regular", good.RegularDiscount{}, 400, 0},
		{"premium", good.PremiumDiscount{}, 400, 40},
		{"vip below the cap", good.VipDiscount{}, 100, 20},
		{"vip above the cap", good.VipDiscount{}, 400, 50},
	}

	for _, c := range cases {
		if got := c.policy.Discount(c.amount); got != c.want {
			t.Errorf("%s: Discount(%v) = %v, want %v", c.name, c.amount, got, c.want)
		}
	}
}

func TestANewCustomerTypeIsAddedWithoutModifyingTheCalculator(t *testing.T) {
	calculator := good.DiscountCalculator{Policies: map[string]good.DiscountPolicy{
		"employee": employeeDiscount{},
	}}

	got, err := calculator.DiscountFor("employee", 400)
	if err != nil {
		t.Fatal(err)
	}
	if got != 120 {
		t.Errorf("DiscountFor() = %v, want 120", got)
	}
}

func TestAnUnknownCustomerTypeIsRejected(t *testing.T) {
	calculator := good.DiscountCalculator{Policies: map[string]good.DiscountPolicy{
		"regular": good.RegularDiscount{},
	}}

	_, err := calculator.DiscountFor("gold", 400)
	if err == nil || err.Error() != "unknown customer type: gold" {
		t.Errorf("DiscountFor() error = %v, want unknown customer type: gold", err)
	}
}
