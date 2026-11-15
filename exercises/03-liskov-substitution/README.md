# Exercise 3 — Liskov Substitution

> 🇫🇷 [Lire en français](README.fr.md)

📖 Principle: [Liskov Substitution Principle](../../principles/03-liskov-substitution)

## The situation

A bank models its accounts with a `BankAccount` class. A new product arrives: the **locked savings account**, which earns interest but does not allow any withdrawal before its maturity date. A developer made it a subclass of `BankAccount` and overrode `withdraw()` to throw.

Open the starting code in your language:

- [`typescript/exercise.ts`](typescript/exercise.ts)
- [`nodejs/exercise.js`](nodejs/exercise.js)
- [`php/Exercise.php`](php/Exercise.php)

At the end of the month, the batch that charges account fees crashes:

```ts
chargeMonthlyFee([new BankAccount(100), new LockedSavingsAccount(1000)], 2);
// Error: Withdrawals are locked until maturity
```

`chargeMonthlyFee` was written against `BankAccount` and did nothing wrong. The subclass broke a promise of its parent.

## Your mission

1. Find the promise that `BankAccount` makes and that `LockedSavingsAccount` cannot keep.
2. Redesign the classes so that **every subclass can fully replace its parent**.
3. `chargeMonthlyFee` must no longer accept a locked savings account. Ideally, passing one should be a compile error in TypeScript or a type error in PHP.
4. Add a `totalBalance(accounts)` function that works with **every** kind of account.

## Done when

- [ ] No method throws just because "this kind of account cannot do that".
- [ ] `chargeMonthlyFee` only receives accounts that support withdrawals.
- [ ] `totalBalance` accepts both checking and locked savings accounts.
- [ ] No `instanceof` check anywhere.

## Hints

<details>
<summary>Hint 1: what do all accounts really have in common?</summary>

Every account has a balance and accepts deposits. Only *some* accounts allow withdrawals. The parent class should only contain what **all** children can honor.
</details>

<details>
<summary>Hint 2: do I have to drop inheritance?</summary>

No! Inheritance is fine when the parent promises only what every child can do. A base `Account` with `balance()` and `deposit()`, and two children `CheckingAccount` (adds `withdraw()`) and `LockedSavingsAccount` (adds `addInterest()`), respects LSP.
</details>

<details>
<summary>Hint 3: what type should each function ask for?</summary>

Ask for the **smallest** type that has what you need: `chargeMonthlyFee` needs `withdraw()`, so it asks for checking accounts. `totalBalance` only needs `balance()`, so it accepts any `Account`.
</details>

## Solution

Try on your own first! Then compare with:

- [`typescript/solution.ts`](typescript/solution.ts)
- [`nodejs/solution.js`](nodejs/solution.js)
- [`php/Solution.php`](php/Solution.php)

Splitting into interfaces such as `Account` and `WithdrawableAccount` is also a valid answer. Notice how close this is to the [Interface Segregation Principle](../../principles/04-interface-segregation), coming next.

⬅️ Previous exercise: [Open/Closed](../02-open-closed) · ➡️ Next exercise: [Interface Segregation](../04-interface-segregation)
