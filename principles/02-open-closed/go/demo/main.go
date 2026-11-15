package main

import (
	"fmt"

	"github.com/fattouchsquall/SOLIDExamples/principles/02-open-closed/go/bad"
	"github.com/fattouchsquall/SOLIDExamples/principles/02-open-closed/go/good"
)

type EmployeeDiscount struct{}

func (EmployeeDiscount) Discount(amount float64) float64 {
	return amount * 0.3
}

func main() {
	amount := 400.0

	fmt.Println("--- Before: a switch that must be edited for every new customer type ---")
	badCalculator := bad.DiscountCalculator{}
	for _, customerType := range []string{"regular", "premium", "vip"} {
		discount, err := badCalculator.DiscountFor(customerType, amount)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%s: -%.2f €\n", customerType, discount)
	}

	fmt.Println("\n--- After: one policy per customer type ---")
	calculator := good.DiscountCalculator{Policies: map[string]good.DiscountPolicy{
		"regular":  good.RegularDiscount{},
		"premium":  good.PremiumDiscount{},
		"vip":      good.VipDiscount{},
		"employee": EmployeeDiscount{},
	}}
	for _, customerType := range []string{"regular", "premium", "vip", "employee"} {
		discount, err := calculator.DiscountFor(customerType, amount)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%s: -%.2f €\n", customerType, discount)
	}
	fmt.Println(`The "employee" discount was added without touching good.go`)
}
