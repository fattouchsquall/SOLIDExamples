package exercise

import (
	"encoding/json"
	"fmt"
	"strings"
)

type SalesRow struct {
	Product string `json:"product"`
	Sales   int    `json:"sales"`
}

type ReportExporter struct{}

func (ReportExporter) Export(format string, rows []SalesRow) (string, error) {
	switch format {
	case "csv":
		lines := []string{"product,sales"}
		for _, row := range rows {
			lines = append(lines, fmt.Sprintf("%s,%d", row.Product, row.Sales))
		}
		return strings.Join(lines, "\n"), nil
	case "json":
		content, err := json.Marshal(rows)
		return string(content), err
	case "html":
		lines := []string{"<table>", "<tr><th>product</th><th>sales</th></tr>"}
		for _, row := range rows {
			lines = append(lines, fmt.Sprintf("<tr><td>%s</td><td>%d</td></tr>", row.Product, row.Sales))
		}
		lines = append(lines, "</table>")
		return strings.Join(lines, "\n"), nil
	default:
		return "", fmt.Errorf("unsupported format: %s", format)
	}
}
