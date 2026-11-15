using System.Text.Json;

namespace Solid.Exercises.OpenClosed.Exercise;

public record SalesRow(string Product, int Sales);

public sealed class ReportExporter
{
    public string Export(string format, IReadOnlyList<SalesRow> rows) => format switch
    {
        "csv" => string.Join("\n", rows.Select(row => $"{row.Product},{row.Sales}").Prepend("product,sales")),
        "json" => JsonSerializer.Serialize(rows, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }),
        "html" => string.Join("\n", rows
            .Select(row => $"<tr><td>{row.Product}</td><td>{row.Sales}</td></tr>")
            .Prepend("<tr><th>product</th><th>sales</th></tr>")
            .Prepend("<table>")
            .Append("</table>")),
        _ => throw new ArgumentException($"Unsupported format: {format}"),
    };
}
