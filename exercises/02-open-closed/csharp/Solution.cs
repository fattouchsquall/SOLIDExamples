using System.Text.Json;

namespace Solid.Exercises.OpenClosed.Solution;

public record SalesRow(string Product, int Sales);

public interface IExporter
{
    string Export(IReadOnlyList<SalesRow> rows);
}

public sealed class CsvExporter : IExporter
{
    public string Export(IReadOnlyList<SalesRow> rows) =>
        string.Join("\n", rows.Select(row => $"{row.Product},{row.Sales}").Prepend("product,sales"));
}

public sealed class JsonExporter : IExporter
{
    private static readonly JsonSerializerOptions Options = new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

    public string Export(IReadOnlyList<SalesRow> rows) => JsonSerializer.Serialize(rows, Options);
}

public sealed class HtmlExporter : IExporter
{
    public string Export(IReadOnlyList<SalesRow> rows) =>
        string.Join("\n", rows
            .Select(row => $"<tr><td>{row.Product}</td><td>{row.Sales}</td></tr>")
            .Prepend("<tr><th>product</th><th>sales</th></tr>")
            .Prepend("<table>")
            .Append("</table>"));
}

public sealed class MarkdownExporter : IExporter
{
    public string Export(IReadOnlyList<SalesRow> rows) =>
        string.Join("\n", rows
            .Select(row => $"| {row.Product} | {row.Sales} |")
            .Prepend("|---|---|")
            .Prepend("| product | sales |"));
}

public sealed class ReportExporter
{
    private readonly IReadOnlyDictionary<string, IExporter> _exporters;

    public ReportExporter(IReadOnlyDictionary<string, IExporter> exporters)
    {
        _exporters = exporters;
    }

    public string Export(string format, IReadOnlyList<SalesRow> rows)
    {
        if (!_exporters.TryGetValue(format, out var exporter))
        {
            throw new ArgumentException($"Unsupported format: {format}");
        }

        return exporter.Export(rows);
    }
}
