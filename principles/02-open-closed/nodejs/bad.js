export class DiscountCalculator {
  discountFor(customerType, amount) {
    switch (customerType) {
      case 'regular':
        return 0;
      case 'premium':
        return amount * 0.1;
      case 'vip':
        return Math.min(amount * 0.2, 50);
      default:
        throw new Error(`Unknown customer type: ${customerType}`);
    }
  }
}
