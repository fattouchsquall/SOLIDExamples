# SOLID Examples

[![CI](https://github.com/fattouchsquall/SOLIDExamples/actions/workflows/ci.yml/badge.svg)](https://github.com/fattouchsquall/SOLIDExamples/actions/workflows/ci.yml)

> 🇬🇧 [Read in English](README.md)

Une boîte à outils pour débutants, pour **comprendre les principes SOLID** et voir comment les appliquer, avec les mêmes exemples écrits en **TypeScript**, **Node.js**, **PHP**, **Python**, **Java**, **Go** et **C#**.

Chaque principe contient :

- 📖 une explication courte et simple
- ❌ une version « mauvaise » qui fonctionne mais devient pénible dès que le code évolue
- ✅ une version « bonne » qui corrige le problème, avec le même comportement
- ▶️ une démo à lancer pour comparer les deux
- 🧪 des tests qui montrent pourquoi la bonne version est plus facile à tester
- 🏋️ un exercice avec sa solution

## SOLID, c'est quoi ?

SOLID regroupe cinq principes de conception pour le code orienté objet, popularisés par Robert C. Martin. Ils aident à écrire du code **facile à faire évoluer sans tout casser**.

| | Principe | En une phrase |
|---|---|---|
| **S** | [Responsabilité unique](principles/01-single-responsibility/README.fr.md) | Une classe ne devrait avoir qu'une seule raison de changer. |
| **O** | [Ouvert/fermé](principles/02-open-closed/README.fr.md) | Ajouter un comportement sans modifier le code existant. |
| **L** | [Substitution de Liskov](principles/03-liskov-substitution/README.fr.md) | Une sous-classe doit pouvoir remplacer sa classe parente partout. |
| **I** | [Ségrégation des interfaces](principles/04-interface-segregation/README.fr.md) | Ne pas obliger une classe à dépendre de méthodes qu'elle n'utilise pas. |
| **D** | [Inversion des dépendances](principles/05-dependency-inversion/README.fr.md) | Dépendre d'abstractions, pas d'implémentations concrètes. |

Ce sont des repères, pas des lois. Le but n'est pas de cocher cinq cases mais de reconnaître les problèmes qu'ils évitent.

## Démarrer

### Prérequis

Il te faut seulement le langage avec lequel tu veux apprendre :

| Langage | Prérequis | Tests avec |
|---|---|---|
| TypeScript, Node.js | [Node.js](https://nodejs.org) 24 ou plus | `node:test` (intégré) |
| PHP | [PHP](https://www.php.net) 8.2 ou plus, [Composer](https://getcomposer.org) | PHPUnit |
| Python | [Python](https://www.python.org) 3.10 ou plus | `unittest` (intégré) |
| Java | [JDK](https://adoptium.net) 22 ou plus (25 LTS conseillé) | JUnit 5 |
| Go | [Go](https://go.dev) 1.24 ou plus | `go test` (intégré) |
| C# | [SDK .NET](https://dotnet.microsoft.com/download) 10 ou plus | xUnit |

Aucune étape de compilation séparée n'est nécessaire pour lancer les démos : Node.js exécute directement les fichiers TypeScript, Java 22+ exécute directement un programme composé de plusieurs fichiers sources, et `go run` et `dotnet run` compilent à la volée.

### Installer

```bash
git clone https://github.com/fattouchsquall/SOLIDExamples.git
cd SOLIDExamples
npm install        # TypeScript et Node.js
composer install   # PHP
```

Python, Java, Go et C# n'ont rien à installer. Le jar de JUnit est téléchargé au premier lancement des tests Java, et .NET récupère xUnit au premier lancement des tests C#.

### Lancer une démo

```bash
node principles/01-single-responsibility/typescript/demo.ts
node principles/01-single-responsibility/nodejs/demo.js
php principles/01-single-responsibility/php/demo.php
python3 principles/01-single-responsibility/python/demo.py
java principles/01-single-responsibility/java/Demo.java
go run ./principles/01-single-responsibility/go/demo
dotnet run --project principles/01-single-responsibility/csharp
```

### Lancer les tests

```bash
make node     # tests TypeScript et Node.js, vérification des types, exercices
make php      # tests PHP et exercices
make python   # tests Python et exercices
make java     # tests Java et exercices
make go       # tests Go et exercices
make csharp   # tests C# et exercices
make test     # tout
```

Les mêmes commandes tournent à chaque push et pull request avec [GitHub Actions](.github/workflows/ci.yml), en plus de toutes les démos.

### Lancer avec Docker

Pas envie d'installer un langage ? Avec [Docker](https://www.docker.com), chaque langage a son service dans [`compose.yaml`](compose.yaml). Le dépôt est monté dans le conteneur, tu lances donc tes propres modifications.

```bash
docker compose run --rm python    # lance les tests Python (pareil pour node, php, java, go, csharp)
docker compose up                 # lance toutes les suites de tests
```

Ajoute une commande pour lancer une démo à la place :

| Service | Lancer une démo |
|---|---|
| `node` | `docker compose run --rm node node principles/01-single-responsibility/typescript/demo.ts` |
| `php` | `docker compose run --rm php php principles/01-single-responsibility/php/demo.php` |
| `python` | `docker compose run --rm python python principles/01-single-responsibility/python/demo.py` |
| `java` | `docker compose run --rm java java principles/01-single-responsibility/java/Demo.java` |
| `go` | `docker compose run --rm go go run ./principles/01-single-responsibility/go/demo` |
| `csharp` | `docker compose run --rm csharp dotnet run --project principles/01-single-responsibility/csharp` |

Le premier lancement télécharge les images et prend quelques minutes. Sous Linux, les fichiers créés par les conteneurs (`node_modules/`, `vendor/`, `bin/`, `obj/`…) appartiennent à `root`.

## Comment utiliser ce dépôt

1. Lis les principes **dans l'ordre** : chacun s'appuie sur les précédents.
2. Pour chaque principe, lis le `README`, puis ouvre `bad` et `good` côte à côte dans ton éditeur.
3. Lance la démo et vérifie que les deux versions affichent le même résultat.
4. Lis les tests pour voir ce que la bonne version rend facile.
5. Fais l'[exercice](exercises/README.fr.md) **avant** de regarder la solution.
6. À la fin, teste-toi avec le [quiz](QUIZ.fr.md) et garde la [fiche mémo](CHEATSHEET.fr.md) sous la main.

Choisis le langage avec lequel tu es le plus à l'aise. Toutes les versions sont volontairement aussi proches que possible, tu peux donc aussi comparer comment chaque langage exprime la même idée.

## Langages

| Langage | Interfaces | Une version par… | Remarques |
|---|---|---|---|
| TypeScript | `interface` | Module ES | Lancé par la suppression des types de Node.js, donc ni `enum` ni propriétés déclarées dans le constructeur |
| Node.js | Aucune : tout objet qui a les bonnes méthodes convient (*duck typing*) | Module ES | Même code que TypeScript, sans les types |
| PHP | `interface` | Namespace (`…\Bad`, `…\Good`) | Les démos chargent les fichiers avec `require_once`, Composer ne sert qu'à PHPUnit |
| Python | `abc.ABC` avec `@abstractmethod` | Module | Les objets valeur sont des `@dataclass` |
| Java | `interface` | Classe englobante (`Bad.Invoice`, `Good.Invoice`) | Les objets valeur sont des `record` |
| Go | `interface`, satisfaite implicitement | Package (`bad`, `good`) | Ni classes ni héritage : des structures, des méthodes et l'embedding. Les erreurs sont renvoyées, pas levées, et commencent par une minuscule |
| C# | `interface` (préfixe `I`) | Namespace (`….Bad`, `….Good`) | Les objets valeur sont des `record`, les montants des `decimal`. Chaque principe a un petit `Demo.csproj`, les tests sont dans [`csharp/`](csharp) |

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
│   │   └── <langage>/    exercise + solution
│   └── ...
├── csharp/               projet de tests et projet d'exercices C#
├── docker/               Dockerfiles utilisés par compose.yaml
├── compose.yaml          un service Docker par langage
├── go.mod                module Go
├── global.json           lanceur de tests .NET (Microsoft.Testing.Platform)
├── CHEATSHEET.md / CHEATSHEET.fr.md
├── QUIZ.md / QUIZ.fr.md
└── CONTRIBUTING.md / CONTRIBUTING.fr.md
```

Pour que chaque exemple se lise de haut en bas, toutes les classes d'une version sont dans un seul fichier. Dans un vrai projet, on mettrait une classe par fichier.

## Contribuer

Une erreur, une explication pas claire, ou envie d'ajouter un langage ? Lis [CONTRIBUTING.fr.md](CONTRIBUTING.fr.md).

## Licence

[MIT](LICENSE)
