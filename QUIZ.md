# SOLID Quiz

> 🇫🇷 [Lire en français](QUIZ.fr.md)

15 questions to check what you learned. Answer each question **before** opening the solution, and count your points at the end.

---

## Principles

### 1. In the Single Responsibility Principle, what is a "responsibility"?

- A) A method
- B) A reason to change, usually tied to one person or team asking for changes
- C) A file
- D) A dependency

<details>
<summary>Answer</summary>

**B.** A class with ten methods can have a single responsibility if they all change for the same reason. A class with two methods can have two responsibilities if two different teams can ask you to change them.

📖 [Single Responsibility](principles/01-single-responsibility)
</details>

### 2. True or false: the Open/Closed Principle means you must never modify an existing file.

<details>
<summary>Answer</summary>

**False.** You will always fix bugs and improve code. OCP means that adding a new *variant* (a new payment method, a new format…) should not force you to edit and retest the existing variants.

📖 [Open/Closed](principles/02-open-closed)
</details>

### 3. Which of these subclasses breaks the Liskov Substitution Principle?

- A) A subclass that adds a new method
- B) A subclass that sometimes returns `null` where the parent always returns a list
- C) A subclass that overrides a method to add logging, with the same result
- D) A subclass declared `final`

<details>
<summary>Answer</summary>

**B.** The parent promises a list. Code written against the parent will call `.length` or loop over the result, and crash on `null`. The subclass delivers *less* than its parent promised (a weaker postcondition).

📖 [Liskov Substitution](principles/03-liskov-substitution)
</details>

### 4. Does the Interface Segregation Principle still apply in plain JavaScript, which has no `interface` keyword?

<details>
<summary>Answer</summary>

**Yes.** Interfaces are implicit in JavaScript, but the problem is the same: don't give a class methods it cannot honor (methods that throw "not supported"), and don't make a function expect a big object when it only uses one method. Small expectations make code easier to reuse and to test.

📖 [Interface Segregation](principles/04-interface-segregation)
</details>

### 5. What is the difference between Dependency Inversion and Dependency Injection?

<details>
<summary>Answer</summary>

**Dependency Inversion** is the *principle*: business code depends on abstractions, not on concrete tools. **Dependency Injection** is a *technique* to apply it: passing the dependencies from the outside, usually through the constructor. An IoC container (NestJS, Symfony…) is a *tool* that automates the injection.

📖 [Dependency Inversion](principles/05-dependency-inversion)
</details>

---

## Spot the violation

### 6. Which principle does this class break first?

```ts
class UserService {
  register(email: string, password: string) { /* ... */ }
  generateMonthlyPdfReport() { /* ... */ }
  sendNewsletter(subject: string) { /* ... */ }
}
```

<details>
<summary>Answer</summary>

**Single Responsibility.** Account management, reporting and marketing are three unrelated reasons to change, probably asked by three different teams. Each should live in its own class.

📖 [Single Responsibility](principles/01-single-responsibility)
</details>

### 7. You have to add the "fedex" carrier. Which principle does this code break, and how would you fix it?

```js
function shippingCost(carrier, weight) {
  if (carrier === 'dhl') return 5 + weight * 1.2;
  if (carrier === 'ups') return 4 + weight * 1.5;
  throw new Error(`Unknown carrier: ${carrier}`);
}
```

<details>
<summary>Answer</summary>

**Open/Closed.** Every new carrier means editing this function. Turn each carrier into an object with a `cost(weight)` method (the **Strategy** pattern), and look up the right one in a map: adding FedEx becomes a new class and one line where the map is built.

📖 [Open/Closed](principles/02-open-closed)
</details>

### 8. Which principle does this code break?

```php
class ReadOnlyFile extends File
{
    public function write(string $content): void
    {
        throw new LogicException('This file is read-only');
    }
}
```

<details>
<summary>Answer</summary>

**Liskov Substitution** first: any code that writes to a `File` crashes when it receives a `ReadOnlyFile`. It is also a sign of an **Interface Segregation** problem: `File` mixes reading and writing, while some files can only be read.

📖 [Liskov Substitution](principles/03-liskov-substitution)
</details>

### 9. A dashboard only displays reports. Which principle does this design break?

```ts
interface ReportRepository {
  find(id: string): Report;
  findAll(): Report[];
  save(report: Report): void;
  delete(id: string): void;
  exportToCsv(): string;
}

class Dashboard {
  constructor(private readonly reports: ReportRepository) {}
  render() { return this.reports.findAll(); }
}
```

<details>
<summary>Answer</summary>

**Interface Segregation.** `Dashboard` only calls `findAll()`, but depends on five methods. A fake for its tests must implement all five, and any change to saving or exporting concerns it for no reason. Ask for a small `ReportReader` interface instead.

📖 [Interface Segregation](principles/04-interface-segregation)
</details>

### 10. Which principle does this code break?

```js
import Stripe from 'stripe';

class CheckoutService {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_KEY);
  }

  pay(order) {
    return this.stripe.charges.create({ amount: order.total });
  }
}
```

<details>
<summary>Answer</summary>

**Dependency Inversion.** The business class creates and depends directly on a vendor SDK and on an environment variable. You cannot test `pay()` without Stripe, nor switch provider without rewriting it. Define a `PaymentGateway` abstraction and pass a `StripePaymentGateway` through the constructor.

📖 [Dependency Inversion](principles/05-dependency-inversion)
</details>

---

## Going deeper

### 11. Why is `Square extends Rectangle` a problem, even though a square *is* a rectangle in maths?

<details>
<summary>Answer</summary>

Because `Rectangle` makes an implicit promise: *setting the height does not change the width*. To stay square, `Square` must break it. A function that sets width 4 and height 5 expects an area of 20 and gets 25 with a square. Inheritance is about keeping promises, not about "is a" in the real world.

📖 [Liskov Substitution](principles/03-liskov-substitution)
</details>

### 12. Does `new Order(id, email, amount)` inside a business method break the Dependency Inversion Principle?

<details>
<summary>Answer</summary>

**No.** `Order` is a value object: plain data you will never want to replace with another implementation. DIP is about dependencies that talk to the outside world (database, network, file system, clock, randomness) or that you genuinely expect to swap.

📖 [Dependency Inversion](principles/05-dependency-inversion)
</details>

### 13. Why is calling `new Date()` directly in business logic a Dependency Inversion concern?

<details>
<summary>Answer</summary>

The system clock is a dependency on the outside world, just like a network call. The result changes every time the code runs, so rules like "before noon, say good morning" cannot be tested reliably. Hiding it behind a small `Clock` interface lets tests choose the time.

📖 [Exercise 5](exercises/05-dependency-inversion)
</details>

### 14. Some implementations of an interface throw `"Not supported"` for one of its methods. Which **two** principles are usually broken?

<details>
<summary>Answer</summary>

**Liskov Substitution**, because those implementations cannot replace the abstraction safely, and **Interface Segregation**, because the interface forces them to have a method they cannot honor. Splitting the interface by role usually fixes both.

📖 [Interface Segregation](principles/04-interface-segregation)
</details>

### 15. To test that "the password must contain at least 8 characters", you need a running MySQL database. What does that tell you?

<details>
<summary>Answer</summary>

Probably two things: the validation rule is mixed with storage (**Single Responsibility**), and the class creates its database connection itself instead of receiving it (**Dependency Inversion**). A pure rule should be testable with a single line and no infrastructure.

📖 [Exercise 1](exercises/01-single-responsibility)
</details>

---

## Your score

| Points | Level |
|---|---|
| 13–15 | 🏆 You've got it. Try to spot these patterns in a real codebase, or help someone else go through this repository. |
| 9–12 | 👍 Solid basics. Re-read the principles you missed and do their exercises. |
| 5–8 | 📚 Good start. Go back to the principles in order and run each demo. |
| 0–4 | 🌱 No worries, everyone starts here. Begin with the [README](README.md) and take one principle per day. |

Keep the [cheat sheet](CHEATSHEET.md) at hand for your next code review.
