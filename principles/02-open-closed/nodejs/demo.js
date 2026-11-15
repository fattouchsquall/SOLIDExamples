import { DiscountCalculator as BadDiscountCalculator } from './bad.js';
import { DiscountCalculator, PremiumDiscount, RegularDiscount, VipDiscount } from './good.js';

const amount = 400;

console.log('--- Before: a switch that must be edited for every new customer type ---');
const badCalculator = new BadDiscountCalculator();
for (const customerType of ['regular', 'premium', 'vip']) {
  console.log(`${customerType}: -${badCalculator.discountFor(customerType, amount).toFixed(2)} €`);
}

console.log('\n--- After: one policy per customer type ---');

class EmployeeDiscount {
  discount(amount) {
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
console.log('The "employee" discount was added without touching good.js');
