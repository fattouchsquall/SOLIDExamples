package good

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

type InvoiceLine struct {
	Label     string
	UnitPrice float64
	Quantity  int
}

type Invoice struct {
	Number   string
	Customer string
	Lines    []InvoiceLine
}

type InvoiceCalculator struct {
	VATRate float64
}

func (c InvoiceCalculator) Subtotal(invoice Invoice) float64 {
	subtotal := 0.0
	for _, line := range invoice.Lines {
		subtotal += line.UnitPrice * float64(line.Quantity)
	}

	return subtotal
}

func (c InvoiceCalculator) VAT(invoice Invoice) float64 {
	return c.Subtotal(invoice) * c.VATRate
}

func (c InvoiceCalculator) Total(invoice Invoice) float64 {
	return c.Subtotal(invoice) + c.VAT(invoice)
}

type InvoiceTextFormatter struct {
	Calculator InvoiceCalculator
}

func (f InvoiceTextFormatter) Format(invoice Invoice) string {
	rows := []string{fmt.Sprintf("Invoice %s for %s", invoice.Number, invoice.Customer)}
	for _, line := range invoice.Lines {
		rows = append(rows, fmt.Sprintf("  %s x%d: %.2f €", line.Label, line.Quantity, line.UnitPrice*float64(line.Quantity)))
	}

	rows = append(rows,
		fmt.Sprintf("Subtotal: %.2f €", f.Calculator.Subtotal(invoice)),
		fmt.Sprintf("VAT: %.2f €", f.Calculator.VAT(invoice)),
		fmt.Sprintf("Total: %.2f €", f.Calculator.Total(invoice)),
	)

	return strings.Join(rows, "\n")
}

type InvoiceFileStorage struct {
	Directory string
}

func (s InvoiceFileStorage) Save(invoice Invoice, content string) (string, error) {
	path := filepath.Join(s.Directory, invoice.Number+".txt")
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		return "", err
	}

	return path, nil
}
