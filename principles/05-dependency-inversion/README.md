# D — Dependency Inversion Principle (DIP)

> 🇫🇷 [Lire en français](README.fr.md)

> **High-level modules should not depend on low-level modules. Both should depend on abstractions.**
> **Abstractions should not depend on details. Details should depend on abstractions.**
> — Robert C. Martin

## In plain words

Your **business logic** (placing an order, computing a price…) should not know **which tools** are used underneath (MySQL, SMTP, Stripe, S3…).

It should describe what it needs ("something that can save an order", "something that can notify a customer"), and receive the concrete tools from the outside.

## The problem

In [`typescript/bad.ts`](typescript/bad.ts), `OrderService` creates its own tools:

```ts
export class OrderService {
  readonly database = new MySqlDatabase();
  readonly mailer = new SmtpMailer();

  placeOrder(customerEmail: string, amount: number): Order {
    // validate, then:
    this.database.insert('orders', order);
    this.mailer.send(customerEmail, 'Order confirmed', `Your order ${order.id} is confirmed`);
  }
}
```

The arrows all point **down**, from the business rule to the technical details:

```
OrderService ──► MySqlDatabase
             └─► SmtpMailer
```

Consequences:

- **Impossible to test in isolation**: every test of `placeOrder()` hits MySQL and sends a real email. Testing the "amount must be positive" rule requires a database.
- **Impossible to switch**: moving to PostgreSQL, or notifying on Slack instead of email, means rewriting `OrderService`, even though the business rule did not change.
- **Hidden dependencies**: you cannot see from the constructor what this class needs to work.

> In the examples, MySQL and SMTP are simulated with `console.log` so you can run everything without installing anything.

## The fix

[`typescript/good.ts`](typescript/good.ts) defines what the business needs, as interfaces **owned by the business side**:

```ts
export interface OrderRepository {
  save(order: Order): void;
}

export interface Notifier {
  notify(recipient: string, message: string): void;
}
```

`OrderService` depends only on those abstractions, and receives the concrete implementations through its constructor:

```ts
export class OrderService {
  constructor(repository: OrderRepository, notifier: Notifier) { /* ... */ }
}
```

The technical classes implement the abstractions. The arrows now point **towards** the abstractions, hence the word *inversion*:

```
OrderService ──► OrderRepository ◄── MySqlOrderRepository, InMemoryOrderRepository
             └─► Notifier        ◄── EmailNotifier, SlackNotifier
```

Choosing the tools happens in one place, at the edge of the application (here, the [demo](typescript/demo.ts)):

```ts
new OrderService(new MySqlOrderRepository(), new EmailNotifier());   // production
new OrderService(new InMemoryOrderRepository(), new SlackNotifier()); // another wiring
```

And the [tests](typescript/good.test.ts) use an in-memory repository and a notifier that records messages: fast, no database, no email.

### DIP, dependency injection, IoC container: what's the difference?

- **Dependency Inversion** is the *principle*: depend on abstractions.
- **Dependency Injection** is a *technique* to apply it: pass the dependencies from the outside, usually through the constructor. That's all this example does.
- An **IoC container** (NestJS, Symfony, Spring…) is a *tool* that does the injection for you automatically. Useful in big apps, but not required to apply DIP.

## Run it

```bash
node principles/05-dependency-inversion/typescript/demo.ts
node principles/05-dependency-inversion/nodejs/demo.js
php principles/05-dependency-inversion/php/demo.php
```

## Warning signs

- `new` of a technical class (database, HTTP client, mailer, SDK) inside business logic.
- Business code imports a vendor library directly (`mysql2`, `nodemailer`, `aws-sdk`, `PDO`…).
- Tests need a running database, a network connection or mocks of global modules.
- Changing a provider forces you to edit classes that contain business rules.

## Don't overdo it

Not every `new` is a problem. Creating a value object (`new Order(...)`, `new Date()`, an array) is fine: those are not dependencies you will want to swap.

Introduce an abstraction for things that **talk to the outside world** (database, network, file system, clock, randomness) or that you genuinely expect to replace.

## Go further

- 🏋️ Exercise: [`exercises/05-dependency-inversion`](../../exercises/05-dependency-inversion)
- ⬅️ Previous principle: [Interface Segregation Principle](../04-interface-segregation)
- 🏁 Back to the [summary](../../README.md), then check yourself with the [quiz](../../QUIZ.md)
