export class ReportExporter {
  export(format, rows) {
    switch (format) {
      case 'csv':
        return ['product,sales', ...rows.map((row) => `${row.product},${row.sales}`)].join('\n');
      case 'json':
        return JSON.stringify(rows);
      case 'html':
        return [
          '<table>',
          '<tr><th>product</th><th>sales</th></tr>',
          ...rows.map((row) => `<tr><td>${row.product}</td><td>${row.sales}</td></tr>`),
          '</table>',
        ].join('\n');
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }
}
