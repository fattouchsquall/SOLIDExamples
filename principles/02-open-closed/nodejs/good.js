export class RegularDiscount {
  discount() {
    return 0;
  }
}

export class PremiumDiscount {
  discount(amount) {
    return amount * 0.1;
  }
}

export class VipDiscount {
  discount(amount) {
    return Math.min(amount * 0.2, 50);
  }
}

export class DiscountCalculator {
  constructor(policies) {
    this.policies = policies;
  }

  discountFor(customerType, amount) {
    const policy = this.policies[customerType];

    if (!policy) {
      throw new Error(`Unknown customer type: ${customerType}`);
    }

    return policy.discount(amount);
  }
}
