from abc import ABC, abstractmethod


class DiscountPolicy(ABC):
    @abstractmethod
    def discount(self, amount: float) -> float: ...


class RegularDiscount(DiscountPolicy):
    def discount(self, amount: float) -> float:
        return 0


class PremiumDiscount(DiscountPolicy):
    def discount(self, amount: float) -> float:
        return amount * 0.1


class VipDiscount(DiscountPolicy):
    def discount(self, amount: float) -> float:
        return min(amount * 0.2, 50)


class DiscountCalculator:
    def __init__(self, policies: dict[str, DiscountPolicy]) -> None:
        self.policies = policies

    def discount_for(self, customer_type: str, amount: float) -> float:
        policy = self.policies.get(customer_type)

        if policy is None:
            raise ValueError(f"Unknown customer type: {customer_type}")

        return policy.discount(amount)
