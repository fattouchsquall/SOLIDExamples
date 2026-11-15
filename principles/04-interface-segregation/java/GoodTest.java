import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class GoodTest {
    @Test
    void aSimplePrinterOnlyImplementsWhatItCanDo() {
        assertEquals("Printing \"Q3 report\"", Good.printReport(new Good.SimplePrinter(), "Q3 report"));
        assertFalse(Good.Scanner.class.isAssignableFrom(Good.SimplePrinter.class));
    }

    @Test
    void anAllInOnePrinterCanBeUsedAsAPrinterOrAsAScanner() {
        Good.AllInOnePrinter allInOne = new Good.AllInOnePrinter();

        assertEquals("Printing \"Q3 report\"", Good.printReport(allInOne, "Q3 report"));
        assertEquals("Scanning \"Signed contract\"", Good.archive(allInOne, "Signed contract"));
    }

    @Test
    void aFakePrinterForTestsOnlyNeedsOneMethod() {
        List<String> printed = new ArrayList<>();
        Good.Printer fakePrinter = document -> {
            printed.add(document);
            return "ok";
        };

        Good.printReport(fakePrinter, "Q3 report");

        assertEquals(List.of("Q3 report"), printed);
    }
}
