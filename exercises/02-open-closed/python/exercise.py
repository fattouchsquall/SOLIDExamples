import json
from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class SalesRow:
    product: str
    sales: int


class ReportExporter:
    def export(self, format: str, rows: list[SalesRow]) -> str:
        match format:
            case "csv":
                return "\n".join(["product,sales", *[f"{row.product},{row.sales}" for row in rows]])
            case "json":
                return json.dumps([asdict(row) for row in rows], separators=(",", ":"))
            case "html":
                return "\n".join(
                    [
                        "<table>",
                        "<tr><th>product</th><th>sales</th></tr>",
                        *[f"<tr><td>{row.product}</td><td>{row.sales}</td></tr>" for row in rows],
                        "</table>",
                    ]
                )
            case _:
                raise ValueError(f"Unsupported format: {format}")
