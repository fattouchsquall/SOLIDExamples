# Contributing

> 🇫🇷 [Lire en français](CONTRIBUTING.fr.md)

Thanks for helping beginners learn SOLID! Every contribution is welcome, from a typo fix to a whole new language.

## Ways to contribute

- 🐛 **Fix a mistake** in the code, the explanations or the translations.
- 💡 **Clarify an explanation** that confused you: if it confused you, it confuses others.
- 🌍 **Improve a translation**: every page exists in English (`README.md`) and French (`README.fr.md`).
- 🧩 **Add a language**: see [the checklist below](#adding-a-language).

For anything bigger than a small fix, please open an issue first so we can agree on the approach.

## Ground rules

This repository is meant for beginners, and its value comes from consistency. Please keep these rules:

1. **Same example in every language.** Same class names, same method names (adapted to the language's naming convention), same error messages, same demo output. A reader must be able to switch language and recognize everything.
2. **Same behavior in `bad` and `good`.** The refactoring changes the structure, never the result. The demos prove it.
3. **One version per file.** All the classes of the "bad" version live in one file, all the classes of the "good" version in another, so each can be read from top to bottom.
4. **No comments in the code.** Explanations belong in the `README`, in both languages. The code must speak for itself through good names.
5. **No dependencies** unless there is no reasonable alternative. Prefer each language's built-in test runner. The only exceptions today are PHPUnit, JUnit and xUnit.
6. **Stay simple.** No frameworks, no clever tricks, no advanced language features when a basic one does the job. If a beginner has to look something up, it should be the principle, not the syntax.
7. **English and French stay in sync.** If you change one, change the other, or say in your pull request that a translation is needed.

## Check your changes locally

```bash
make node     # TypeScript and Node.js
make php      # PHP
make python   # Python
make java     # Java
make go       # Go
make csharp   # C#
```

Also run the demos you touched and check that "before" and "after" print the same result. The [CI](.github/workflows/ci.yml) runs all of this on every pull request.

## Anatomy of a principle

```
principles/0N-name/
├── README.md / README.fr.md
└── <language>/
    ├── bad      the version that works but violates the principle
    ├── good     the refactored version
    ├── demo     runs both and prints the results
    └── test     tests the good version only
```

Each principle `README` follows the same outline:

1. **Title and quote**: the principle and its original wording.
2. **In plain words**: the idea without jargon.
3. **The problem**: an excerpt of `bad`, and why it hurts, with a concrete change request.
4. **The fix**: an excerpt of `good`, and what became easy.
5. **Language notes** when needed (for example, "What about JavaScript?").
6. **Run it**: one command per language.
7. **Warning signs**: how to spot the problem in real code.
8. **Don't overdo it**: when applying the principle becomes harmful.
9. **Go further**: links to the exercise and the previous and next principles.

Each exercise contains a `README` (situation, mission, "Done when" checklist, hints in `<details>`, links to the solutions) and, per language, an `exercise` file to refactor and a `solution` file.

## Adding a language

Thanks for the ambition! Here is everything a new language needs, so nothing is forgotten. Open an issue first to agree on the conventions (how interfaces and value objects are written, which test runner).

### Code

- [ ] `principles/0N-*/<language>/` for the 5 principles: `bad`, `good`, `demo` and a test file, following the naming convention of the language.
- [ ] `exercises/0N-*/<language>/` for the 5 exercises: `exercise` and `solution`.
- [ ] The demos run with a single command, without a build step if the language allows it.
- [ ] Number formatting does not depend on the machine's locale (`125.00`, never `125,00`).

### Tooling

- [ ] A `make <language>` target in the [`Makefile`](Makefile) that runs the tests and checks that the exercises compile, and its addition to `make test`.
- [ ] A job in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) that runs `make <language>` and all the demos.
- [ ] A service in [`compose.yaml`](compose.yaml) whose default command is `make <language>`, with a Dockerfile in [`docker/`](docker) only if the official image lacks a tool such as `make`.
- [ ] Build artifacts and caches added to [`.gitignore`](.gitignore).

### Documentation, in English and French

- [ ] The "Run it" command in the 10 principle `README` files.
- [ ] The `exercise` and `solution` links in the 10 exercise `README` files.
- [ ] Language-specific notes in the exercises when the hints mention syntax.
- [ ] In the root `README.md` and `README.fr.md`: the introduction, the prerequisites table, "Run a demo", "Run the tests", the "Languages" table and the structure tree.
- [ ] The run command in `exercises/README.md` and `exercises/README.fr.md`.

## Pull requests

- Keep pull requests small and focused: one principle, one language or one fix at a time is easier to review.
- Describe what you changed and why. For a new example or exercise, explain what a beginner should learn from it.
- Be kind in reviews and discussions. Everyone here was a beginner once.

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
