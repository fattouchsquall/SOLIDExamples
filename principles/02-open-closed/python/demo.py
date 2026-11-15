from bad import DiscountCalculator as BadDiscountCalculator
from good import DiscountCalculator, DiscountPolicy, PremiumDiscount, RegularDiscount, VipDiscount


class EmployeeDiscount(DiscountPolicy):
    def discount(self, amount: float) -> float:
        return amount * 0.3


amount = 400

print("--- Before: a match that must be edited for every new customer type ---")
bad_calculator = BadDiscountCalculator()
for customer_type in ["regular", "premium", "vip"]:
    print(f"{customer_type}: -{bad_calculator.discount_for(customer_type, amount):.2f} €")

print("\n--- After: one policy per customer type ---")
calculator = DiscountCalculator(
    {
        "regular": RegularDiscount(),
        "premium": PremiumDiscount(),
        "vip": VipDiscount(),
        "employee": EmployeeDiscount(),
    }
)
for customer_type in ["regular", "premium", "vip", "employee"]:
    print(f"{customer_type}: -{calculator.discount_for(customer_type, amount):.2f} €")
print('The "employee" discount was added without touching good.py')
