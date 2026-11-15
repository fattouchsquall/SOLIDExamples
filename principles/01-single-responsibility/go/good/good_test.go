package good_test

import (
	"strings"
	"testing"

	"github.com/fattouchsquall/SOLIDExamples/principles/01-single-responsibility/go/good"
)

var invoice = good.Invoice{
	Number:   "INV-001",
	Customer: "Alice",
	Lines: []good.InvoiceLine{
		{Label: "Keyboard", UnitPrice: 50, Quantity: 2},
		{Label: "Mouse", UnitPrice: 25, Quantity: 1},
	},
}

func TestTheCalculatorOnlyDoesTheMath(t *testing.T) {
	calculator := good.InvoiceCalculator{VATRate: 0.2}

	if got := calculator.Subtotal(invoice); got != 125 {
		t.Errorf("Subtotal() = %v, want 125", got)
	}
	if got := calculator.VAT(invoice); got != 25 {
		t.Errorf("VAT() = %v, want 25", got)
	}
	if got := calculator.Total(invoice); got != 150 {
		t.Errorf("Total() = %v, want 150", got)
	}
}

func TestANewVATRateOnlyNeedsANewCalculator(t *testing.T) {
	if got := (good.InvoiceCalculator{VATRate: 0.1}).Total(invoice); got != 137.5 {
		t.Errorf("Total() = %v, want 137.5", got)
	}
}

func TestTheFormatterRendersTextWithoutTouchingTheDisk(t *testing.T) {
	text := good.InvoiceTextFormatter{Calculator: good.InvoiceCalculator{VATRate: 0.2}}.Format(invoice)

	if !strings.HasPrefix(text, "Invoice INV-001 for Alice") {
		t.Errorf("unexpected header in %q", text)
	}
	if !strings.HasSuffix(text, "Total: 150.00 €") {
		t.Errorf("unexpected total in %q", text)
	}
}
