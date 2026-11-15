public final class Good {
    private Good() {
    }

    public interface Printer {
        String print(String document);
    }

    public interface Scanner {
        String scan(String document);
    }

    public interface Fax {
        String fax(String document, String phoneNumber);
    }

    public static final class AllInOnePrinter implements Printer, Scanner, Fax {
        @Override
        public String print(String document) {
            return "Printing \"" + document + "\"";
        }

        @Override
        public String scan(String document) {
            return "Scanning \"" + document + "\"";
        }

        @Override
        public String fax(String document, String phoneNumber) {
            return "Faxing \"" + document + "\" to " + phoneNumber;
        }
    }

    public static final class SimplePrinter implements Printer {
        @Override
        public String print(String document) {
            return "Printing \"" + document + "\"";
        }
    }

    public static String printReport(Printer printer, String report) {
        return printer.print(report);
    }

    public static String archive(Scanner scanner, String document) {
        return scanner.scan(document);
    }
}
