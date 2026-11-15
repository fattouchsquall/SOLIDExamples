class DiscountCalculator:
    def discount_for(self, customer_type: str, amount: float) -> float:
        match customer_type:
            case "regular":
                return 0
            case "premium":
                return amount * 0.1
            case "vip":
                return min(amount * 0.2, 50)
            case _:
                raise ValueError(f"Unknown customer type: {customer_type}")
