package good

type Printer interface {
	Print(document string) string
}

type Scanner interface {
	Scan(document string) string
}

type Fax interface {
	Fax(document, phoneNumber string) string
}

type AllInOnePrinter struct{}

func (AllInOnePrinter) Print(document string) string {
	return `Printing "` + document + `"`
}

func (AllInOnePrinter) Scan(document string) string {
	return `Scanning "` + document + `"`
}

func (AllInOnePrinter) Fax(document, phoneNumber string) string {
	return `Faxing "` + document + `" to ` + phoneNumber
}

type SimplePrinter struct{}

func (SimplePrinter) Print(document string) string {
	return `Printing "` + document + `"`
}

func PrintReport(printer Printer, report string) string {
	return printer.Print(report)
}

func Archive(scanner Scanner, document string) string {
	return scanner.Scan(document)
}
