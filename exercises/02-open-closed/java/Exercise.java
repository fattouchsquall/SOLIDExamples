import java.util.List;
import java.util.stream.Collectors;

public final class Exercise {
    private Exercise() {
    }

    public record SalesRow(String product, int sales) {
    }

    public static final class ReportExporter {
        public String export(String format, List<SalesRow> rows) {
            return switch (format) {
                case "csv" -> rows.stream()
                        .map(row -> row.product() + "," + row.sales())
                        .collect(Collectors.joining("\n", "product,sales\n", ""));
                case "json" -> rows.stream()
                        .map(row -> "{\"product\":\"" + row.product() + "\",\"sales\":" + row.sales() + "}")
                        .collect(Collectors.joining(",", "[", "]"));
                case "html" -> rows.stream()
                        .map(row -> "<tr><td>" + row.product() + "</td><td>" + row.sales() + "</td></tr>")
                        .collect(Collectors.joining(
                                "\n",
                                "<table>\n<tr><th>product</th><th>sales</th></tr>\n",
                                "\n</table>"));
                default -> throw new IllegalArgumentException("Unsupported format: " + format);
            };
        }
    }
}
