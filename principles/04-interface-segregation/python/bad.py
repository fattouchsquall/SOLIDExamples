from abc import ABC, abstractmethod


class Machine(ABC):
    @abstractmethod
    def print(self, document: str) -> str: ...

    @abstractmethod
    def scan(self, document: str) -> str: ...

    @abstractmethod
    def fax(self, document: str, phone_number: str) -> str: ...


class AllInOnePrinter(Machine):
    def print(self, document: str) -> str:
        return f'Printing "{document}"'

    def scan(self, document: str) -> str:
        return f'Scanning "{document}"'

    def fax(self, document: str, phone_number: str) -> str:
        return f'Faxing "{document}" to {phone_number}'


class SimplePrinter(Machine):
    def print(self, document: str) -> str:
        return f'Printing "{document}"'

    def scan(self, document: str) -> str:
        raise NotImplementedError("SimplePrinter cannot scan")

    def fax(self, document: str, phone_number: str) -> str:
        raise NotImplementedError("SimplePrinter cannot fax")


def print_report(machine: Machine, report: str) -> str:
    return machine.print(report)
