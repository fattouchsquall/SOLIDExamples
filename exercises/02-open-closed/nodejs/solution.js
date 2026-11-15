export class CsvExporter {
  export(rows) {
    return ['product,sales', ...rows.map((row) => `${row.product},${row.sales}`)].join('\n');
  }
}

export class JsonExporter {
  export(rows) {
    return JSON.stringify(rows);
  }
}

export class HtmlExporter {
  export(rows) {
    return [
      '<table>',
      '<tr><th>product</th><th>sales</th></tr>',
      ...rows.map((row) => `<tr><td>${row.product}</td><td>${row.sales}</td></tr>`),
      '</table>',
    ].join('\n');
  }
}

export class MarkdownExporter {
  export(rows) {
    return [
      '| product | sales |',
      '|---|---|',
      ...rows.map((row) => `| ${row.product} | ${row.sales} |`),
    ].join('\n');
  }
}

export class ReportExporter {
  constructor(exporters) {
    this.exporters = exporters;
  }

  export(format, rows) {
    const exporter = this.exporters[format];

    if (!exporter) {
      throw new Error(`Unsupported format: ${format}`);
    }

    return exporter.export(rows);
  }
}
