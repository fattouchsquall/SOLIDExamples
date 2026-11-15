export type SalesRow = { product: string; sales: number };

export interface Exporter {
  export(rows: SalesRow[]): string;
}

export class CsvExporter implements Exporter {
  export(rows: SalesRow[]): string {
    return ['product,sales', ...rows.map((row) => `${row.product},${row.sales}`)].join('\n');
  }
}

export class JsonExporter implements Exporter {
  export(rows: SalesRow[]): string {
    return JSON.stringify(rows);
  }
}

export class HtmlExporter implements Exporter {
  export(rows: SalesRow[]): string {
    return [
      '<table>',
      '<tr><th>product</th><th>sales</th></tr>',
      ...rows.map((row) => `<tr><td>${row.product}</td><td>${row.sales}</td></tr>`),
      '</table>',
    ].join('\n');
  }
}

export class MarkdownExporter implements Exporter {
  export(rows: SalesRow[]): string {
    return [
      '| product | sales |',
      '|---|---|',
      ...rows.map((row) => `| ${row.product} | ${row.sales} |`),
    ].join('\n');
  }
}

export class ReportExporter {
  readonly exporters: Record<string, Exporter>;

  constructor(exporters: Record<string, Exporter>) {
    this.exporters = exporters;
  }

  export(format: string, rows: SalesRow[]): string {
    const exporter = this.exporters[format];

    if (!exporter) {
      throw new Error(`Unsupported format: ${format}`);
    }

    return exporter.export(rows);
  }
}
