# Exercise 1 — Single Responsibility

> 🇫🇷 [Lire en français](README.fr.md)

📖 Principle: [Single Responsibility Principle](../../principles/01-single-responsibility)

## The situation

Your team has a `UserRegistration` class that signs up new users. Open the starting code in your language:

- [`typescript/exercise.ts`](typescript/exercise.ts)
- [`nodejs/exercise.js`](nodejs/exercise.js)
- [`php/Exercise.php`](php/Exercise.php)

It works, but its single `register()` method does a lot. And requests keep coming:

- The security team wants a stronger hashing algorithm.
- The product team wants passwords of at least 12 characters with a digit.
- The marketing team wants to change the welcome email.
- The ops team wants to store users in a real database.

Four teams, one method.

## Your mission

1. List every reason `UserRegistration` could have to change. Write them down before coding.
2. Extract one class per reason.
3. Keep `UserRegistration` as the class that **orchestrates** the sign-up: it calls the others in the right order.
4. The behavior must stay exactly the same: same error messages, same email, same result.

## Done when

- [ ] Changing the password rules only touches one small class.
- [ ] Changing the hashing algorithm only touches one small class.
- [ ] You can test the validation rules without hashing, storing or sending anything.
- [ ] `register()` reads like a short list of steps.

## Hints

<details>
<summary>Hint 1: how many responsibilities?</summary>

There are four: **validating** the input, **hashing** the password, **storing** the user, **sending** the welcome email.
</details>

<details>
<summary>Hint 2: where does the "already registered" check go?</summary>

Checking that an email is not taken needs to know the stored users. It is not a pure input validation like the format of the email. Let the storage class answer "does this email exist?", and let `UserRegistration` decide what to do with the answer.
</details>

<details>
<summary>Hint 3: how does UserRegistration get the other classes?</summary>

Pass them to its constructor. You will see in the [Dependency Inversion Principle](../../principles/05-dependency-inversion) why this is so useful.
</details>

## Try it

Write a small script next to your code, for example in TypeScript:

```ts
import { UserRegistration } from './exercise.ts';

const registration = new UserRegistration();
console.log(registration.register('alice@example.com', 'super-secret'));
registration.register('alice@example.com', 'another-secret'); // throws
```

> ⚠️ SHA-256 is used here to keep the example short. To store real passwords, use a dedicated algorithm such as bcrypt or Argon2.

## Solution

Try on your own first! Then compare with:

- [`typescript/solution.ts`](typescript/solution.ts)
- [`nodejs/solution.js`](nodejs/solution.js)
- [`php/Solution.php`](php/Solution.php)

Your solution does not have to be identical. If each class has one reason to change, you got it.

➡️ Next exercise: [Open/Closed](../02-open-closed)
