package main

import (
	"fmt"
	"os"

	"github.com/fattouchsquall/SOLIDExamples/principles/01-single-responsibility/go/bad"
	"github.com/fattouchsquall/SOLIDExamples/principles/01-single-responsibility/go/good"
)

func main() {
	fmt.Println("--- Before: one type does everything ---")
	badInvoice := bad.Invoice{
		Number:   "INV-001",
		Customer: "Alice",
		Lines: []bad.InvoiceLine{
			{Label: "Keyboard", UnitPrice: 50, Quantity: 2},
			{Label: "Mouse", UnitPrice: 25, Quantity: 1},
		},
	}
	fmt.Println(badInvoice.ToText())
	badPath, err := badInvoice.Save(os.TempDir())
	if err != nil {
		panic(err)
	}
	fmt.Println("Saved to " + badPath)

	fmt.Println("\n--- After: one type per responsibility ---")
	invoice := good.Invoice{
		Number:   "INV-002",
		Customer: "Alice",
		Lines: []good.InvoiceLine{
			{Label: "Keyboard", UnitPrice: 50, Quantity: 2},
			{Label: "Mouse", UnitPrice: 25, Quantity: 1},
		},
	}
	formatter := good.InvoiceTextFormatter{Calculator: good.InvoiceCalculator{VATRate: 0.2}}
	storage := good.InvoiceFileStorage{Directory: os.TempDir()}
	text := formatter.Format(invoice)
	fmt.Println(text)
	path, err := storage.Save(invoice, text)
	if err != nil {
		panic(err)
	}
	fmt.Println("Saved to " + path)
}
