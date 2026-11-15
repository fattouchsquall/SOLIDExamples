# SOLID Examples

[![CI](https://github.com/fattouchsquall/SOLIDExamples/actions/workflows/ci.yml/badge.svg)](https://github.com/fattouchsquall/SOLIDExamples/actions/workflows/ci.yml)

> 🇫🇷 [Lire en français](README.fr.md)

A beginner-friendly toolkit to **understand the SOLID principles** and see how to apply them, with the same examples written in **TypeScript**, **Node.js**, **PHP**, **Python**, **Java**, **Go** and **C#**.

Each principle comes with:

- 📖 a short explanation in plain words
- ❌ a "bad" version that works but hurts as soon as the code evolves
- ✅ a "good" version that fixes it, with the same behavior
- ▶️ a demo you can run to compare both
- 🧪 tests showing why the good version is easier to test
- 🏋️ an exercise with its solution

## What is SOLID?

SOLID is a set of five design principles for object-oriented code, popularized by Robert C. Martin. They help you write code that is **easy to change without breaking everything**.

| | Principle | In one sentence |
|---|---|---|
| **S** | [Single Responsibility](principles/01-single-responsibility) | A class should have only one reason to change. |
| **O** | [Open/Closed](principles/02-open-closed) | Add new behavior without modifying existing code. |
| **L** | [Liskov Substitution](principles/03-liskov-substitution) | A subclass must be usable wherever its parent is expected. |
| **I** | [Interface Segregation](principles/04-interface-segregation) | Don't force a class to depend on methods it doesn't use. |
| **D** | [Dependency Inversion](principles/05-dependency-inversion) | Depend on abstractions, not on concrete implementations. |

These are guidelines, not laws. The goal is not to tick five boxes but to recognize the pain they prevent.

## Getting started

### Prerequisites

You only need the language you want to learn with:

| Language | Requirement | Tests with |
|---|---|---|
| TypeScript, Node.js | [Node.js](https://nodejs.org) 24 or later | `node:test` (built in) |
| PHP | [PHP](https://www.php.net) 8.2 or later, [Composer](https://getcomposer.org) | PHPUnit |
| Python | [Python](https://www.python.org) 3.10 or later | `unittest` (built in) |
| Java | [JDK](https://adoptium.net) 22 or later (25 LTS recommended) | JUnit 5 |
| Go | [Go](https://go.dev) 1.24 or later | `go test` (built in) |
| C# | [.NET SDK](https://dotnet.microsoft.com/download) 10 or later | xUnit |

No separate build step is needed to run the demos: Node.js runs TypeScript files directly, Java 22+ runs a program made of several source files directly, and `go run` and `dotnet run` compile on the fly.

### Install

```bash
git clone https://github.com/fattouchsquall/SOLIDExamples.git
cd SOLIDExamples
npm install        # TypeScript and Node.js
composer install   # PHP
```

Python, Java, Go and C# need nothing to install. The JUnit jar is downloaded the first time you run the Java tests, and .NET restores xUnit the first time you run the C# tests.

### Run a demo

```bash
node principles/01-single-responsibility/typescript/demo.ts
node principles/01-single-responsibility/nodejs/demo.js
php principles/01-single-responsibility/php/demo.php
python3 principles/01-single-responsibility/python/demo.py
java principles/01-single-responsibility/java/Demo.java
go run ./principles/01-single-responsibility/go/demo
dotnet run --project principles/01-single-responsibility/csharp
```

### Run the tests

```bash
make node     # TypeScript and Node.js tests, type checking, exercises
make php      # PHP tests and exercises
make python   # Python tests and exercises
make java     # Java tests and exercises
make go       # Go tests and exercises
make csharp   # C# tests and exercises
make test     # everything
```

The same commands run on every push and pull request with [GitHub Actions](.github/workflows/ci.yml), together with all the demos.

### Run with Docker

Don't want to install a language? With [Docker](https://www.docker.com), each language has its own service in [`compose.yaml`](compose.yaml). The repository is mounted in the container, so you run your own changes.

```bash
docker compose run --rm python    # run the Python tests (same for node, php, java, go, csharp)
docker compose up                 # run every test suite
```

Add a command to run a demo instead:

| Service | Run a demo |
|---|---|
| `node` | `docker compose run --rm node node principles/01-single-responsibility/typescript/demo.ts` |
| `php` | `docker compose run --rm php php principles/01-single-responsibility/php/demo.php` |
| `python` | `docker compose run --rm python python principles/01-single-responsibility/python/demo.py` |
| `java` | `docker compose run --rm java java principles/01-single-responsibility/java/Demo.java` |
| `go` | `docker compose run --rm go go run ./principles/01-single-responsibility/go/demo` |
| `csharp` | `docker compose run --rm csharp dotnet run --project principles/01-single-responsibility/csharp` |

The first run downloads the images and takes a few minutes. On Linux, the files created by the containers (`node_modules/`, `vendor/`, `bin/`, `obj/`…) belong to `root`.

## How to use this repository

1. Read the principles **in order**: each one builds on the previous ones.
2. For each principle, read the `README`, then open `bad` and `good` side by side in your editor.
3. Run the demo and check that both versions print the same result.
4. Read the tests to see what the good version makes easy.
5. Try the [exercise](exercises) **before** looking at the solution.
6. When you are done, check yourself with the [quiz](QUIZ.md) and keep the [cheat sheet](CHEATSHEET.md) at hand.

Pick the language you are most comfortable with. All versions are intentionally as close as possible, so you can also compare how each language expresses the same idea.

## Languages

| Language | Interfaces | One version per… | Notes |
|---|---|---|---|
| TypeScript | `interface` | ES module | Runs with Node.js type stripping, so no `enum` and no constructor parameter properties |
| Node.js | None: any object with the right methods fits (*duck typing*) | ES module | Same code as TypeScript, without types |
| PHP | `interface` | Namespace (`…\Bad`, `…\Good`) | Demos load files with `require_once`, Composer is only needed for PHPUnit |
| Python | `abc.ABC` with `@abstractmethod` | Module | Value objects are `@dataclass` |
| Java | `interface` | Outer class (`Bad.Invoice`, `Good.Invoice`) | Value objects are `record` |
| Go | `interface`, satisfied implicitly | Package (`bad`, `good`) | No classes and no inheritance: structs, methods and embedding. Errors are returned, not thrown, and start with a lowercase letter |
| C# | `interface` (`I` prefix) | Namespace (`….Bad`, `….Good`) | Value objects are `record`, money is `decimal`. Each principle has a small `Demo.csproj`, the tests live in [`csharp/`](csharp) |

## Structure

```
SOLIDExamples/
├── principles/
│   ├── 01-single-responsibility/
│   │   ├── README.md / README.fr.md
│   │   ├── typescript/   bad.ts   good.ts   demo.ts   good.test.ts
│   │   ├── nodejs/       bad.js   good.js   demo.js   good.test.js
│   │   ├── php/          Bad.php  Good.php  demo.php  GoodTest.php
│   │   ├── python/       bad.py   good.py   demo.py   good_test.py
│   │   ├── java/         Bad.java Good.java Demo.java GoodTest.java
│   │   ├── go/           bad/bad.go  good/good.go  good/good_test.go  demo/main.go
│   │   └── csharp/       Bad.cs   Good.cs   Demo.cs   GoodTests.cs  Demo.csproj
│   ├── 02-open-closed/
│   ├── 03-liskov-substitution/
│   ├── 04-interface-segregation/
│   └── 05-dependency-inversion/
├── exercises/
│   ├── 01-single-responsibility/
│   │   ├── README.md / README.fr.md
│   │   └── <language>/   exercise + solution
│   └── ...
├── csharp/               C# test project and exercises project
├── docker/               Dockerfiles used by compose.yaml
├── compose.yaml          one Docker service per language
├── go.mod                Go module
├── global.json           .NET test runner (Microsoft.Testing.Platform)
├── CHEATSHEET.md / CHEATSHEET.fr.md
├── QUIZ.md / QUIZ.fr.md
└── CONTRIBUTING.md / CONTRIBUTING.fr.md
```

To keep each example readable from top to bottom, all the classes of a version live in a single file. In a real project, you would put one class per file.

## Contributing

Found a mistake, an unclear explanation, or want to add a language? See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
