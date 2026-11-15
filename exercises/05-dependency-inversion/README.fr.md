# Exercice 5 — Inversion des dépendances

> 🇬🇧 [Read in English](README.md)

📖 Principe : [Principe d'inversion des dépendances](../../principles/05-dependency-inversion/README.fr.md)

## La situation

Un `WeatherReporter` construit un message sympathique à partir de l'API météo et de l'heure de la journée :

```
Good morning! It is 3°C in Paris. Take a coat.
```

Ouvre le code de départ dans ton langage :

- [`typescript/exercise.ts`](typescript/exercise.ts)
- [`nodejs/exercise.js`](nodejs/exercise.js)
- [`php/Exercise.php`](php/Exercise.php)
- [`python/exercise.py`](python/exercise.py)
- [`java/Exercise.java`](java/Exercise.java)
- [`go/exercise/exercise.go`](go/exercise/exercise.go)
- [`csharp/Exercise.cs`](csharp/Exercise.cs)

> L'API météo est simulée : elle répond toujours 12 °C et affiche l'appel HTTP qu'elle ferait.

On te demande d'écrire des tests pour ces règles :

- avant midi, le message dit « Good morning », avant 18 h « Good afternoon », sinon « Good evening » ;
- en dessous de 10 °C, il conseille de prendre un manteau.

Et tu es bloqué : le résultat dépend de **l'heure réelle** au moment du test, et de **la vraie API**, qui répond toujours 12 °C. Impossible de tester la règle du matin l'après-midi, ni la règle du froid tout court.

## Ta mission

1. Identifie les deux dépendances cachées de `WeatherReporter`.
2. Décris chacune avec une abstraction qui part du point de vue du reporter.
3. Passe les implémentations à `WeatherReporter` par son constructeur.
4. Écris (ou au moins imagine) un test qui vérifie « Good morning! It is 3°C in Paris. Take a coat. » sans appeler l'API et sans dépendre de l'heure.

## C'est réussi quand

- [ ] `WeatherReporter` ne contient aucun `new` d'une classe technique, ni lecture directe de l'horloge (`new Date()`, `new DateTimeImmutable()`, `datetime.now()`, `LocalDateTime.now()`, `time.Now()`, `DateTime.Now`).
- [ ] Tu peux choisir l'heure et la température dans un test.
- [ ] Changer de fournisseur météo ne touche pas `WeatherReporter`.

## Indices

<details>
<summary>Indice 1 : quelles sont les deux dépendances ?</summary>

La plus évidente est le client de l'API météo. La plus sournoise est l'**horloge** : `new Date()` lit l'heure du système, c'est une dépendance au monde extérieur au même titre qu'un appel réseau.
</details>

<details>
<summary>Indice 2 : à quoi doivent ressembler les abstractions ?</summary>

Pense à ce dont le reporter a besoin, pas au fonctionnement de l'API : « donne-moi la température actuelle d'une ville » et « donne-moi l'heure actuelle ». Deux interfaces d'une méthode chacune.
</details>

<details>
<summary>Indice 3 : comment les remplacer dans un test ?</summary>

En TypeScript et en JavaScript, un simple objet suffit :

```ts
const morning = { now: () => new Date('2026-01-15T08:00:00') };
const cold = { currentTemperature: () => 3 };

new WeatherReporter(cold, morning).report('Paris');
// "Good morning! It is 3°C in Paris. Take a coat."
```

En PHP, utilise des classes anonymes : `new class implements Clock { ... }`. En Java, les deux interfaces n'ont qu'une méthode, une lambda suffit donc : `() -> LocalDateTime.of(2026, 1, 15, 8, 0)`. En Python, écris une petite sous-classe dans le test. En Go et en C#, une petite structure ou classe qui implémente l'interface fait l'affaire.

Bon à savoir : Java et C# fournissent déjà une abstraction pour ça, `java.time.Clock` (avec `Clock.fixed(...)` pour les tests) et `TimeProvider`.
</details>

## Solution

Essaie d'abord seul ! Puis compare avec :

- [`typescript/solution.ts`](typescript/solution.ts)
- [`nodejs/solution.js`](nodejs/solution.js)
- [`php/Solution.php`](php/Solution.php)
- [`python/solution.py`](python/solution.py)
- [`java/Solution.java`](java/Solution.java)
- [`go/solution/solution.go`](go/solution/solution.go)
- [`csharp/Solution.cs`](csharp/Solution.cs)

🎉 C'était le dernier exercice. Vérifie ce que tu as retenu avec le [quiz](../../QUIZ.fr.md).

⬅️ Exercice précédent : [Ségrégation des interfaces](../04-interface-segregation/README.fr.md)
