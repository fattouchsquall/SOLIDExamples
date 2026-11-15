package bad

import "errors"

type Machine interface {
	Print(document string) string
	Scan(document string) (string, error)
	Fax(document, phoneNumber string) (string, error)
}

type AllInOnePrinter struct{}

func (AllInOnePrinter) Print(document string) string {
	return `Printing "` + document + `"`
}

func (AllInOnePrinter) Scan(document string) (string, error) {
	return `Scanning "` + document + `"`, nil
}

func (AllInOnePrinter) Fax(document, phoneNumber string) (string, error) {
	return `Faxing "` + document + `" to ` + phoneNumber, nil
}

type SimplePrinter struct{}

func (SimplePrinter) Print(document string) string {
	return `Printing "` + document + `"`
}

func (SimplePrinter) Scan(document string) (string, error) {
	return "", errors.New("SimplePrinter cannot scan")
}

func (SimplePrinter) Fax(document, phoneNumber string) (string, error) {
	return "", errors.New("SimplePrinter cannot fax")
}

func PrintReport(machine Machine, report string) string {
	return machine.Print(report)
}
