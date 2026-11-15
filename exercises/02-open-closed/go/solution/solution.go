package solution

import (
	"encoding/json"
	"fmt"
	"strings"
)

type SalesRow struct {
	Product string `json:"product"`
	Sales   int    `json:"sales"`
}

type Exporter interface {
	Export(rows []SalesRow) (string, error)
}

type CSVExporter struct{}

func (CSVExporter) Export(rows []SalesRow) (string, error) {
	lines := []string{"product,sales"}
	for _, row := range rows {
		lines = append(lines, fmt.Sprintf("%s,%d", row.Product, row.Sales))
	}

	return strings.Join(lines, "\n"), nil
}

type JSONExporter struct{}

func (JSONExporter) Export(rows []SalesRow) (string, error) {
	content, err := json.Marshal(rows)

	return string(content), err
}

type HTMLExporter struct{}

func (HTMLExporter) Export(rows []SalesRow) (string, error) {
	lines := []string{"<table>", "<tr><th>product</th><th>sales</th></tr>"}
	for _, row := range rows {
		lines = append(lines, fmt.Sprintf("<tr><td>%s</td><td>%d</td></tr>", row.Product, row.Sales))
	}
	lines = append(lines, "</table>")

	return strings.Join(lines, "\n"), nil
}

type MarkdownExporter struct{}

func (MarkdownExporter) Export(rows []SalesRow) (string, error) {
	lines := []string{"| product | sales |", "|---|---|"}
	for _, row := range rows {
		lines = append(lines, fmt.Sprintf("| %s | %d |", row.Product, row.Sales))
	}

	return strings.Join(lines, "\n"), nil
}

type ReportExporter struct {
	Exporters map[string]Exporter
}

func (r ReportExporter) Export(format string, rows []SalesRow) (string, error) {
	exporter, found := r.Exporters[format]
	if !found {
		return "", fmt.Errorf("unsupported format: %s", format)
	}

	return exporter.Export(rows)
}
