import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { DiscountCalculator, PremiumDiscount, RegularDiscount, VipDiscount } from './good.js';

describe('OCP - Node.js', () => {
  test('each policy can be tested on its own', () => {
    assert.equal(new RegularDiscount().discount(), 0);
    assert.equal(new PremiumDiscount().discount(400), 40);
    assert.equal(new VipDiscount().discount(100), 20);
    assert.equal(new VipDiscount().discount(400), 50);
  });

  test('a new customer type is added without modifying the calculator', () => {
    class EmployeeDiscount {
      discount(amount) {
        return amount * 0.3;
      }
    }

    const calculator = new DiscountCalculator({ employee: new EmployeeDiscount() });

    assert.equal(calculator.discountFor('employee', 400), 120);
  });

  test('an unknown customer type is rejected', () => {
    const calculator = new DiscountCalculator({ regular: new RegularDiscount() });

    assert.throws(() => calculator.discountFor('gold', 400), /Unknown customer type: gold/);
  });
});
