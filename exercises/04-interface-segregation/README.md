# Exercise 4 — Interface Segregation

> 🇫🇷 [Lire en français](README.fr.md)

📖 Principle: [Interface Segregation Principle](../../principles/04-interface-segregation)

## The situation

An application stores reports either on S3 (in production) or on the local disk (in development). Both storages implement one `FileStorage` interface with four methods: `read`, `write`, `delete` and `signedUrl`.

Open the starting code in your language:

- [`typescript/exercise.ts`](typescript/exercise.ts)
- [`nodejs/exercise.js`](nodejs/exercise.js)
- [`php/Exercise.php`](php/Exercise.php)

> The storages are simulated in memory, so you can run everything without an AWS account.

Problems the team keeps running into:

- The local disk cannot generate signed URLs, so `LocalDiskStorage.signedUrl()` throws. Nobody notices until the "Share" button crashes in development.
- `ReportViewer` only reads files, but it asks for a full `FileStorage`. To test it, you need a fake with four methods.
- The team wants to add a `copy()` method for S3. With the current design, `LocalDiskStorage` and every test fake would have to implement it too.

## Your mission

1. Split `FileStorage` into smaller interfaces, grouped by **what clients actually use**.
2. Make each storage implement only what it really supports.
3. Make `ReportViewer` and `ReportSharer` ask only for what they need.
4. Passing a `LocalDiskStorage` to `ReportSharer` should become a compile error in TypeScript and a type error in PHP.

## Done when

- [ ] No method throws "cannot do this".
- [ ] A test fake for `ReportViewer` only needs a `read()` method.
- [ ] Adding a new capability to S3 does not force any change on `LocalDiskStorage`.

## Hints

<details>
<summary>Hint 1: how many interfaces?</summary>

Look at who calls what. `ReportViewer` reads. `ReportSharer` generates signed URLs. Writing and deleting usually go together (an upload service, a cleanup job). That makes three roles: reading, writing, sharing.
</details>

<details>
<summary>Hint 2: can a class implement several interfaces?</summary>

Yes. `S3Storage` can implement all three roles, `LocalDiskStorage` only reading and writing. In TypeScript: `class S3Storage implements A, B, C`. In PHP: `final class S3Storage implements A, B, C`.
</details>

<details>
<summary>Hint 3: what about JavaScript?</summary>

There is no `interface` keyword, but the idea is the same: remove `signedUrl()` from `LocalDiskStorage` instead of making it throw, and name the constructor parameters after the role they play (`urls`, `reader`…), not after the whole storage.
</details>

## Solution

Try on your own first! Then compare with:

- [`typescript/solution.ts`](typescript/solution.ts)
- [`nodejs/solution.js`](nodejs/solution.js)
- [`php/Solution.php`](php/Solution.php)

⬅️ Previous exercise: [Liskov Substitution](../03-liskov-substitution) · ➡️ Next exercise: [Dependency Inversion](../05-dependency-inversion)
