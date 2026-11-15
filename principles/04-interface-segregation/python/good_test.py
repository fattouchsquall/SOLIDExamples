import unittest

from good import AllInOnePrinter, Printer, Scanner, SimplePrinter, archive, print_report


class InterfaceSegregationTest(unittest.TestCase):
    def test_a_simple_printer_only_implements_what_it_can_do(self) -> None:
        simple_printer = SimplePrinter()

        self.assertEqual(print_report(simple_printer, "Q3 report"), 'Printing "Q3 report"')
        self.assertNotIsInstance(simple_printer, Scanner)

    def test_an_all_in_one_printer_can_be_used_as_a_printer_or_as_a_scanner(self) -> None:
        all_in_one = AllInOnePrinter()

        self.assertEqual(print_report(all_in_one, "Q3 report"), 'Printing "Q3 report"')
        self.assertEqual(archive(all_in_one, "Signed contract"), 'Scanning "Signed contract"')

    def test_a_fake_printer_for_tests_only_needs_one_method(self) -> None:
        class FakePrinter(Printer):
            def __init__(self) -> None:
                self.printed: list[str] = []

            def print(self, document: str) -> str:
                self.printed.append(document)
                return "ok"

        fake_printer = FakePrinter()

        print_report(fake_printer, "Q3 report")

        self.assertEqual(fake_printer.printed, ["Q3 report"])


if __name__ == "__main__":
    unittest.main()
