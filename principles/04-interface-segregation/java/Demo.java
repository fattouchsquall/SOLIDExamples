public final class Demo {
    public static void main(String[] args) {
        System.out.println("--- Before: one big Machine interface ---");
        Bad.SimplePrinter badPrinter = new Bad.SimplePrinter();
        System.out.println(Bad.printReport(badPrinter, "Q3 report"));
        try {
            badPrinter.scan("Signed contract");
        } catch (UnsupportedOperationException exception) {
            System.out.println("Runtime error: " + exception.getMessage());
        }

        System.out.println("\n--- After: small Printer, Scanner and Fax interfaces ---");
        Good.SimplePrinter simplePrinter = new Good.SimplePrinter();
        Good.AllInOnePrinter allInOne = new Good.AllInOnePrinter();
        System.out.println(Good.printReport(simplePrinter, "Q3 report"));
        System.out.println(Good.printReport(allInOne, "Q3 report"));
        System.out.println(Good.archive(allInOne, "Signed contract"));
        System.out.println("Good.archive(simplePrinter, ...) does not even compile: SimplePrinter is not a Scanner");
    }
}
