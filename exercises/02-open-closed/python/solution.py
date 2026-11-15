import json
from abc import ABC, abstractmethod
from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class SalesRow:
    product: str
    sales: int


class Exporter(ABC):
    @abstractmethod
    def export(self, rows: list[SalesRow]) -> str: ...


class CsvExporter(Exporter):
    def export(self, rows: list[SalesRow]) -> str:
        return "\n".join(["product,sales", *[f"{row.product},{row.sales}" for row in rows]])


class JsonExporter(Exporter):
    def export(self, rows: list[SalesRow]) -> str:
        return json.dumps([asdict(row) for row in rows], separators=(",", ":"))


class HtmlExporter(Exporter):
    def export(self, rows: list[SalesRow]) -> str:
        return "\n".join(
            [
                "<table>",
                "<tr><th>product</th><th>sales</th></tr>",
                *[f"<tr><td>{row.product}</td><td>{row.sales}</td></tr>" for row in rows],
                "</table>",
            ]
        )


class MarkdownExporter(Exporter):
    def export(self, rows: list[SalesRow]) -> str:
        return "\n".join(
            [
                "| product | sales |",
                "|---|---|",
                *[f"| {row.product} | {row.sales} |" for row in rows],
            ]
        )


class ReportExporter:
    def __init__(self, exporters: dict[str, Exporter]) -> None:
        self.exporters = exporters

    def export(self, format: str, rows: list[SalesRow]) -> str:
        exporter = self.exporters.get(format)

        if exporter is None:
            raise ValueError(f"Unsupported format: {format}")

        return exporter.export(rows)
