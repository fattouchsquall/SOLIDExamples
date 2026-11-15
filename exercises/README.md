# Exercises

> 🇫🇷 [Lire en français](README.fr.md)

One exercise per principle. Each one gives you working but badly designed code, and asks you to refactor it.

| # | Exercise | Situation |
|---|---|---|
| 1 | [Single Responsibility](01-single-responsibility) | A user sign-up class that validates, hashes, stores and emails |
| 2 | [Open/Closed](02-open-closed) | A report exporter that needs a new Markdown format |
| 3 | [Liskov Substitution](03-liskov-substitution) | A locked savings account that breaks the monthly fee batch |
| 4 | [Interface Segregation](04-interface-segregation) | A file storage interface the local disk cannot fully honor |
| 5 | [Dependency Inversion](05-dependency-inversion) | A weather report impossible to test because of the API and the clock |

## How to work on an exercise

1. Read the principle first, in [`principles/`](../principles).
2. Open the exercise `README` and the `exercise` file in your language.
3. Refactor the code directly in the `exercise` file, or copy it to a new file.
4. Check every box of the "Done when" list.
5. Use the hints only if you are stuck, one at a time.
6. Compare with the `solution` file. Yours does not have to be identical: what matters is that the principle is respected.

Each `exercise` file is self-contained, so you can import it from a small script and run it with `node`, `php`, `python3`, `java`, `go run` or `dotnet run` to check that the behavior stays the same.
