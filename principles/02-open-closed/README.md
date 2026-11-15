# O — Open/Closed Principle (OCP)

> 🇫🇷 [Lire en français](README.fr.md)

> **Software entities should be open for extension, but closed for modification.**
> — Bertrand Meyer

## In plain words

When a new need comes in, you should be able to **add new code** rather than **edit code that already works**.

"Closed for modification" does not mean you can never touch a file again. It means that adding a new *variant* of something (a new payment method, a new export format, a new customer type…) should not force you to reopen and retest the existing variants.

## The problem

[`typescript/bad.ts`](typescript/bad.ts) computes a discount with a `switch`:

```ts
discountFor(customerType: CustomerType, amount: number): number {
  switch (customerType) {
    case 'regular': return 0;
    case 'premium': return amount * 0.1;
    case 'vip':     return Math.min(amount * 0.2, 50);
    default: throw new Error(`Unknown customer type: ${customerType}`);
  }
}
```

Now marketing wants an "employee" discount of 30%. You have to:

1. Open `DiscountCalculator`, a class that works and is used everywhere.
2. Add a `case`, and maybe break the others with a typo.
3. Retest every customer type, because they all live in the same method.

And it will happen again with "student", "black-friday", "partner"… The `switch` grows forever, and often gets copied in other places (invoices, emails, reports) that must all be updated too.

## The fix

[`typescript/good.ts`](typescript/good.ts) turns each `case` into a class that follows the same contract:

```ts
export interface DiscountPolicy {
  discount(amount: number): number;
}

export class PremiumDiscount implements DiscountPolicy {
  discount(amount: number): number {
    return amount * 0.1;
  }
}
```

The calculator no longer knows the rules. It just picks the right policy and delegates:

```ts
discountFor(customerType: string, amount: number): number {
  const policy = this.policies[customerType];
  // ...
  return policy.discount(amount);
}
```

Adding the employee discount is now **a new class**, and `good.ts` is not touched at all. The [demo](typescript/demo.ts) and the [tests](typescript/good.test.ts) do exactly that:

```ts
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
```

This is the **Strategy** design pattern, the most common way to apply OCP.

### What about JavaScript?

Plain JavaScript has no `interface` keyword. In [`nodejs/good.js`](nodejs/good.js), the contract is implicit: any object with a `discount(amount)` method works. This is called *duck typing* ("if it walks like a duck and quacks like a duck…"). The principle is the same, only the compiler no longer checks it for you.

## Run it

```bash
node principles/02-open-closed/typescript/demo.ts
node principles/02-open-closed/nodejs/demo.js
php principles/02-open-closed/php/demo.php
python3 principles/02-open-closed/python/demo.py
java principles/02-open-closed/java/Demo.java
go run ./principles/02-open-closed/go/demo
dotnet run --project principles/02-open-closed/csharp
```

## Warning signs

- A `switch`, `match` or chain of `if/else if` on a **type** (`type`, `kind`, `status`, `provider`…).
- The same `switch` appears in several files.
- Every new feature request starts with "open this class and add a case".
- A bug fix for one variant broke another one.

## Don't overdo it

You cannot make code open to *every* possible change, and trying to do so creates layers of abstraction nobody needs.

A `switch` with three stable cases that never change is fine. Introduce an abstraction **the second or third time** a new variant shows up, when you know which part actually varies.

## Go further

- 🏋️ Exercise: [`exercises/02-open-closed`](../../exercises/02-open-closed)
- ⬅️ Previous principle: [Single Responsibility Principle](../01-single-responsibility)
- ➡️ Next principle: [Liskov Substitution Principle](../03-liskov-substitution)
