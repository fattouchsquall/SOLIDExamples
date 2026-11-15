import { DiscountCalculator as BadDiscountCalculator } from './bad.ts';
import {
  type DiscountPolicy,
  DiscountCalculator,
  PremiumDiscount,
  RegularDiscount,
  VipDiscount,
} from './good.ts';

const amount = 400;

console.log('--- Before: a switch that must be edited for every new customer type ---');
const badCalculator = new BadDiscountCalculator();
for (const customerType of ['regular', 'premium', 'vip'] as const) {
  console.log(`${customerType}: -${badCalculator.discountFor(customerType, amount).toFixed(2)} €`);
}

console.log('\n--- After: one policy per customer type ---');

class EmployeeDiscount implements DiscountPolicy {
  discount(amount: number): number {
    return amount * 0.3;
  }
}

const calculator = new DiscountCalculator({
  regular: new RegularDiscount(),
  premium: new PremiumDiscount(),
  vip: new VipDiscount(),
  employee: new EmployeeDiscount(),
});
for (const customerType of ['regular', 'premium', 'vip', 'employee']) {
  console.log(`${customerType}: -${calculator.discountFor(customerType, amount).toFixed(2)} €`);
}
console.log('The "employee" discount was added without touching good.ts');
