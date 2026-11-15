package bad

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

func (i Invoice) Subtotal() float64 {
	subtotal := 0.0
	for _, line := range i.Lines {
		subtotal += line.UnitPrice * float64(line.Quantity)
	}

	return subtotal
}

func (i Invoice) VAT() float64 {
	return i.Subtotal() * 0.2
}

func (i Invoice) Total() float64 {
	return i.Subtotal() + i.VAT()
}

func (i Invoice) ToText() string {
	rows := []string{fmt.Sprintf("Invoice %s for %s", i.Number, i.Customer)}
	for _, line := range i.Lines {
		rows = append(rows, fmt.Sprintf("  %s x%d: %.2f €", line.Label, line.Quantity, line.UnitPrice*float64(line.Quantity)))
	}

	rows = append(rows,
		fmt.Sprintf("Subtotal: %.2f €", i.Subtotal()),
		fmt.Sprintf("VAT: %.2f €", i.VAT()),
		fmt.Sprintf("Total: %.2f €", i.Total()),
	)

	return strings.Join(rows, "\n")
}

func (i Invoice) Save(directory string) (string, error) {
	path := filepath.Join(directory, i.Number+".txt")
	if err := os.WriteFile(path, []byte(i.ToText()), 0o644); err != nil {
		return "", err
	}

	return path, nil
}
