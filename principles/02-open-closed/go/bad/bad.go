package bad

import (
	"fmt"
	"math"
)

type DiscountCalculator struct{}

func (DiscountCalculator) DiscountFor(customerType string, amount float64) (float64, error) {
	switch customerType {
	case "regular":
		return 0, nil
	case "premium":
		return amount * 0.1, nil
	case "vip":
		return math.Min(amount*0.2, 50), nil
	default:
		return 0, fmt.Errorf("unknown customer type: %s", customerType)
	}
}
