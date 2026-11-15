from bad import SimplePrinter as BadSimplePrinter
from bad import print_report as bad_print_report
from good import AllInOnePrinter, Scanner, SimplePrinter, archive, print_report

print("--- Before: one big Machine interface ---")
bad_printer = BadSimplePrinter()
print(bad_print_report(bad_printer, "Q3 report"))
try:
    bad_printer.scan("Signed contract")
except NotImplementedError as error:
    print(f"Runtime error: {error}")

print("\n--- After: small Printer, Scanner and Fax interfaces ---")
simple_printer = SimplePrinter()
all_in_one = AllInOnePrinter()
print(print_report(simple_printer, "Q3 report"))
print(print_report(all_in_one, "Q3 report"))
print(archive(all_in_one, "Signed contract"))
print(f"SimplePrinter is a Scanner: {isinstance(simple_printer, Scanner)}")
