import unittest

from good import DiscountCalculator, DiscountPolicy, PremiumDiscount, RegularDiscount, VipDiscount


class OpenClosedTest(unittest.TestCase):
    def test_each_policy_can_be_tested_on_its_own(self) -> None:
        self.assertEqual(RegularDiscount().discount(400), 0)
        self.assertEqual(PremiumDiscount().discount(400), 40)
        self.assertEqual(VipDiscount().discount(100), 20)
        self.assertEqual(VipDiscount().discount(400), 50)

    def test_a_new_customer_type_is_added_without_modifying_the_calculator(self) -> None:
        class EmployeeDiscount(DiscountPolicy):
            def discount(self, amount: float) -> float:
                return amount * 0.3

        calculator = DiscountCalculator({"employee": EmployeeDiscount()})

        self.assertEqual(calculator.discount_for("employee", 400), 120)

    def test_an_unknown_customer_type_is_rejected(self) -> None:
        calculator = DiscountCalculator({"regular": RegularDiscount()})

        with self.assertRaisesRegex(ValueError, "Unknown customer type: gold"):
            calculator.discount_for("gold", 400)


if __name__ == "__main__":
    unittest.main()
