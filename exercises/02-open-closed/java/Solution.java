import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public final class Solution {
    private Solution() {
    }

    public record SalesRow(String product, int sales) {
    }

    public interface Exporter {
        String export(List<SalesRow> rows);
    }

    public static final class CsvExporter implements Exporter {
        @Override
        public String export(List<SalesRow> rows) {
            return rows.stream()
                    .map(row -> row.product() + "," + row.sales())
                    .collect(Collectors.joining("\n", "product,sales\n", ""));
        }
    }

    public static final class JsonExporter implements Exporter {
        @Override
        public String export(List<SalesRow> rows) {
            return rows.stream()
                    .map(row -> "{\"product\":\"" + row.product() + "\",\"sales\":" + row.sales() + "}")
                    .collect(Collectors.joining(",", "[", "]"));
        }
    }

    public static final class HtmlExporter implements Exporter {
        @Override
        public String export(List<SalesRow> rows) {
            return rows.stream()
                    .map(row -> "<tr><td>" + row.product() + "</td><td>" + row.sales() + "</td></tr>")
                    .collect(Collectors.joining(
                            "\n",
                            "<table>\n<tr><th>product</th><th>sales</th></tr>\n",
                            "\n</table>"));
        }
    }

    public static final class MarkdownExporter implements Exporter {
        @Override
        public String export(List<SalesRow> rows) {
            return rows.stream()
                    .map(row -> "| " + row.product() + " | " + row.sales() + " |")
                    .collect(Collectors.joining("\n", "| product | sales |\n|---|---|\n", ""));
        }
    }

    public static final class ReportExporter {
        private final Map<String, Exporter> exporters;

        public ReportExporter(Map<String, Exporter> exporters) {
            this.exporters = exporters;
        }

        public String export(String format, List<SalesRow> rows) {
            Exporter exporter = exporters.get(format);

            if (exporter == null) {
                throw new IllegalArgumentException("Unsupported format: " + format);
            }

            return exporter.export(rows);
        }
    }
}
