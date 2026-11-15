package main

import (
	"fmt"

	"github.com/fattouchsquall/SOLIDExamples/principles/04-interface-segregation/go/bad"
	"github.com/fattouchsquall/SOLIDExamples/principles/04-interface-segregation/go/good"
)

func main() {
	fmt.Println("--- Before: one big Machine interface ---")
	badPrinter := bad.SimplePrinter{}
	fmt.Println(bad.PrintReport(badPrinter, "Q3 report"))
	if _, err := badPrinter.Scan("Signed contract"); err != nil {
		fmt.Println("Runtime error: " + err.Error())
	}

	fmt.Println("\n--- After: small Printer, Scanner and Fax interfaces ---")
	var simplePrinter good.Printer = good.SimplePrinter{}
	allInOne := good.AllInOnePrinter{}
	fmt.Println(good.PrintReport(simplePrinter, "Q3 report"))
	fmt.Println(good.PrintReport(allInOne, "Q3 report"))
	fmt.Println(good.Archive(allInOne, "Signed contract"))
	_, isScanner := simplePrinter.(good.Scanner)
	fmt.Printf("SimplePrinter is a Scanner: %v\n", isScanner)
}
