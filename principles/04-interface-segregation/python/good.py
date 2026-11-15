from abc import ABC, abstractmethod


class Printer(ABC):
    @abstractmethod
    def print(self, document: str) -> str: ...


class Scanner(ABC):
    @abstractmethod
    def scan(self, document: str) -> str: ...


class Fax(ABC):
    @abstractmethod
    def fax(self, document: str, phone_number: str) -> str: ...


class AllInOnePrinter(Printer, Scanner, Fax):
    def print(self, document: str) -> str:
        return f'Printing "{document}"'

    def scan(self, document: str) -> str:
        return f'Scanning "{document}"'

    def fax(self, document: str, phone_number: str) -> str:
        return f'Faxing "{document}" to {phone_number}'


class SimplePrinter(Printer):
    def print(self, document: str) -> str:
        return f'Printing "{document}"'


def print_report(printer: Printer, report: str) -> str:
    return printer.print(report)


def archive(scanner: Scanner, document: str) -> str:
    return scanner.scan(document)
