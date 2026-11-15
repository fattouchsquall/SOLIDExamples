package good_test

import (
	"slices"
	"testing"

	"github.com/fattouchsquall/SOLIDExamples/principles/04-interface-segregation/go/good"
)

type fakePrinter struct {
	printed []string
}

func (f *fakePrinter) Print(document string) string {
	f.printed = append(f.printed, document)
	return "ok"
}

func TestASimplePrinterOnlyImplementsWhatItCanDo(t *testing.T) {
	var printer good.Printer = good.SimplePrinter{}

	if got := good.PrintReport(printer, "Q3 report"); got != `Printing "Q3 report"` {
		t.Errorf("PrintReport() = %q", got)
	}
	if _, isScanner := printer.(good.Scanner); isScanner {
		t.Error("SimplePrinter should not be a Scanner")
	}
}

func TestAnAllInOnePrinterCanBeUsedAsAPrinterOrAsAScanner(t *testing.T) {
	allInOne := good.AllInOnePrinter{}

	if got := good.PrintReport(allInOne, "Q3 report"); got != `Printing "Q3 report"` {
		t.Errorf("PrintReport() = %q", got)
	}
	if got := good.Archive(allInOne, "Signed contract"); got != `Scanning "Signed contract"` {
		t.Errorf("Archive() = %q", got)
	}
}

func TestAFakePrinterForTestsOnlyNeedsOneMethod(t *testing.T) {
	printer := &fakePrinter{}

	good.PrintReport(printer, "Q3 report")

	if !slices.Equal(printer.printed, []string{"Q3 report"}) {
		t.Errorf("printed = %v, want [Q3 report]", printer.printed)
	}
}
