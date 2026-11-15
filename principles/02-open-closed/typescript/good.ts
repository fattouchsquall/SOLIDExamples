export interface DiscountPolicy {
  discount(amount: number): number;
}

export class RegularDiscount implements DiscountPolicy {
  discount(): number {
    return 0;
  }
}

export class PremiumDiscount implements DiscountPolicy {
  discount(amount: number): number {
    return amount * 0.1;
  }
}

export class VipDiscount implements DiscountPolicy {
  discount(amount: number): number {
    return Math.min(amount * 0.2, 50);
  }
}

export class DiscountCalculator {
  readonly policies: Record<string, DiscountPolicy>;

  constructor(policies: Record<string, DiscountPolicy>) {
    this.policies = policies;
  }

  discountFor(customerType: string, amount: number): number {
    const policy = this.policies[customerType];

    if (!policy) {
      throw new Error(`Unknown customer type: ${customerType}`);
    }

    return policy.discount(amount);
  }
}
