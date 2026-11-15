# SOLID Cheat Sheet

> 🇫🇷 [Lire en français](CHEATSHEET.fr.md)

Keep this page open while you code or review.

## The five principles at a glance

| | Principle | Rule | Question to ask |
|---|---|---|---|
| **S** | [Single Responsibility](principles/01-single-responsibility) | A class has one reason to change. | *Who could ask me to change this?* |
| **O** | [Open/Closed](principles/02-open-closed) | Add behavior by adding code, not by editing working code. | *What do I have to edit to add a new variant?* |
| **L** | [Liskov Substitution](principles/03-liskov-substitution) | A subtype can replace its parent without surprises. | *Does every child keep all the promises of the parent?* |
| **I** | [Interface Segregation](principles/04-interface-segregation) | No client depends on methods it doesn't use. | *Does this class or function really need all of this?* |
| **D** | [Dependency Inversion](principles/05-dependency-inversion) | Business code depends on abstractions, not on tools. | *Can I test this without a database, the network or the clock?* |

## S — Single Responsibility

| 🚨 Warning signs | ✅ Typical fix |
|---|---|
| The class name ends with `Manager`, `Handler`, `Service`, and keeps growing | Split by **reason to change**: calculation, formatting, storage, notification… |
| You need "and" to describe the class | Keep one class that orchestrates and delegates |
| Imports from very different worlds (math, HTML, SQL, HTTP) | Group code that changes together, separate code that changes for different reasons |
| Testing a small rule requires a database | Extract the rule into a class without side effects |

⚠️ **Overdoing it**: one method per class. Methods that change for the same reason belong together.

## O — Open/Closed

| 🚨 Warning signs | ✅ Typical fix |
|---|---|
| `switch` / `match` / `if-else` chain on a type, a kind, a provider | One class per variant behind a shared interface (**Strategy**) |
| The same `switch` copied in several files | A registry or map from key to implementation, built outside the class |
| Every new feature starts with "add a case in…" | New variant = new class + one line where things are wired |

⚠️ **Overdoing it**: abstracting a `switch` with three stable cases. Wait for the second or third new variant.

## L — Liskov Substitution

| 🚨 Warning signs | ✅ Typical fix |
|---|---|
| An override that throws `NotImplemented` or does nothing | Move the method out of the parent: keep only what **all** children can do |
| `instanceof` / `typeof` / `get_class()` checks in client code | A shared interface that each class can fully honor |
| A subclass changes the effect of **another** method (the `Square` / `Rectangle` trap) | Immutable objects, or composition instead of inheritance |
| The parent's tests fail on the child | Run the same contract tests on every implementation |

A subtype must not:

- ask for **more** than its parent (stronger preconditions),
- give **less** than its parent (weaker postconditions),
- break the parent's **invariants**,
- throw **new kinds of errors**.

⚠️ **Overdoing it**: banning inheritance. It's fine when the child can do everything the parent promises.

## I — Interface Segregation

| 🚨 Warning signs | ✅ Typical fix |
|---|---|
| Methods implemented only to throw or to stay empty | Split the interface by **role**: `Printer`, `Scanner`, `Fax` |
| A function receives a big object but calls one method | Ask for the smallest interface that has what you need |
| A test double has to implement ten methods | A class can implement several small interfaces |
| Adding a method forces edits in unrelated classes | Group methods that the same clients always use together |

⚠️ **Overdoing it**: one method per interface by default. Split when a client needs only part of it.

## D — Dependency Inversion

| 🚨 Warning signs | ✅ Typical fix |
|---|---|
| `new Database()`, `new HttpClient()`, `new Mailer()` inside business code | Define an interface from the business point of view (`OrderRepository`, `Notifier`) |
| Business code imports a vendor SDK directly | Pass implementations through the constructor (**dependency injection**) |
| `new Date()`, `Math.random()`, `process.env` hidden in logic | Wrap the clock, randomness and config behind small interfaces too |
| Tests need a running database or network | Use in-memory fakes in tests, real implementations in production |

⚠️ **Overdoing it**: an interface for every class. Value objects (`Order`, `Date` as data, arrays) don't need one. Abstract what talks to the outside world.

## How they work together

- **SRP** gives you small classes. **DIP** connects them without tying them to each other.
- **OCP** is usually reached through **LSP** (every variant is a safe substitute) and **DIP** (the code depends on the abstraction, not on the variants).
- A method that throws "not supported" usually breaks **both LSP and ISP**.
- Good SOLID code is **easy to test**: if testing is painful, one of the five is probably being violated.

## Vocabulary

| Term | Meaning |
|---|---|
| Abstraction | An interface (or abstract class) that describes *what* something does, not *how* |
| Implementation | A concrete class that does the actual work |
| Dependency injection | Passing a class its dependencies from the outside, usually through the constructor |
| Test double / fake | A simple implementation used in tests instead of the real one |
| Duck typing | In JavaScript, any object with the right methods fits, without declaring an interface |
| Strategy | A pattern where interchangeable behaviors share one interface |

## When NOT to apply SOLID strictly

- Throwaway scripts, prototypes, small one-off tools.
- Code that has never changed and has no reason to.
- When the abstraction makes the code harder to read than the problem it solves.

SOLID is a means to keep code **easy to change**. If a change is not coming, simple code wins.
