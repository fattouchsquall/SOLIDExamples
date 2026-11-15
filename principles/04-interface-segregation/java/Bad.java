public final class Bad {
    private Bad() {
    }

    public interface Machine {
        String print(String document);

        String scan(String document);

        String fax(String document, String phoneNumber);
    }

    public static final class AllInOnePrinter implements Machine {
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

    public static final class SimplePrinter implements Machine {
        @Override
        public String print(String document) {
            return "Printing \"" + document + "\"";
        }

        @Override
        public String scan(String document) {
            throw new UnsupportedOperationException("SimplePrinter cannot scan");
        }

        @Override
        public String fax(String document, String phoneNumber) {
            throw new UnsupportedOperationException("SimplePrinter cannot fax");
        }
    }

    public static String printReport(Machine machine, String report) {
        return machine.print(report);
    }
}
