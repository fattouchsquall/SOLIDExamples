# Exercise 5 — Dependency Inversion

> 🇫🇷 [Lire en français](README.fr.md)

📖 Principle: [Dependency Inversion Principle](../../principles/05-dependency-inversion)

## The situation

A `WeatherReporter` builds a friendly message from the weather API and the time of day:

```
Good morning! It is 3°C in Paris. Take a coat.
```

Open the starting code in your language:

- [`typescript/exercise.ts`](typescript/exercise.ts)
- [`nodejs/exercise.js`](nodejs/exercise.js)
- [`php/Exercise.php`](php/Exercise.php)
- [`python/exercise.py`](python/exercise.py)
- [`java/Exercise.java`](java/Exercise.java)
- [`go/exercise/exercise.go`](go/exercise/exercise.go)
- [`csharp/Exercise.cs`](csharp/Exercise.cs)

> The weather API is simulated: it always answers 12°C and prints the HTTP call it would make.

You are asked to write tests for these rules:

- before noon, the message says "Good morning", before 6 pm "Good afternoon", otherwise "Good evening";
- below 10°C, it advises to take a coat.

And you are stuck: the result depends on **the real time** when the test runs, and on **the real API**, which always says 12°C. You cannot test the morning rule in the afternoon, nor the cold weather rule at all.

## Your mission

1. Identify the two hidden dependencies of `WeatherReporter`.
2. Describe each one with an abstraction that belongs to the reporter's point of view.
3. Pass the implementations to `WeatherReporter` through its constructor.
4. Write (or at least imagine) a test that checks "Good morning! It is 3°C in Paris. Take a coat." without calling the API and without depending on the time of day.

## Done when

- [ ] `WeatherReporter` does not contain any `new` of a technical class, nor a direct read of the clock (`new Date()`, `new DateTimeImmutable()`, `datetime.now()`, `LocalDateTime.now()`, `time.Now()`, `DateTime.Now`).
- [ ] You can choose the time and the temperature in a test.
- [ ] Switching to another weather provider does not touch `WeatherReporter`.

## Hints

<details>
<summary>Hint 1: what are the two dependencies?</summary>

The obvious one is the weather API client. The sneaky one is the **clock**: `new Date()` reads the system time, which is a dependency on the outside world just like a network call.
</details>

<details>
<summary>Hint 2: what should the abstractions look like?</summary>

Think about what the reporter needs, not about how the API works: "give me the current temperature in a city" and "give me the current time". Two interfaces with one method each.
</details>

<details>
<summary>Hint 3: how do I fake them in a test?</summary>

In TypeScript and JavaScript, a plain object is enough:

```ts
const morning = { now: () => new Date('2026-01-15T08:00:00') };
const cold = { currentTemperature: () => 3 };

new WeatherReporter(cold, morning).report('Paris');
// "Good morning! It is 3°C in Paris. Take a coat."
```

In PHP, use anonymous classes: `new class implements Clock { ... }`. In Java, both interfaces have a single method, so a lambda works: `() -> LocalDateTime.of(2026, 1, 15, 8, 0)`. In Python, write a tiny subclass in the test. In Go and C#, a small struct or class implementing the interface does the job.

Good to know: Java and C# already ship an abstraction for this, `java.time.Clock` (with `Clock.fixed(...)` for tests) and `TimeProvider`.
</details>

## Solution

Try on your own first! Then compare with:

- [`typescript/solution.ts`](typescript/solution.ts)
- [`nodejs/solution.js`](nodejs/solution.js)
- [`php/Solution.php`](php/Solution.php)
- [`python/solution.py`](python/solution.py)
- [`java/Solution.java`](java/Solution.java)
- [`go/solution/solution.go`](go/solution/solution.go)
- [`csharp/Solution.cs`](csharp/Solution.cs)

🎉 That was the last exercise. Check what you learned with the [quiz](../../QUIZ.md).

⬅️ Previous exercise: [Interface Segregation](../04-interface-segregation)
