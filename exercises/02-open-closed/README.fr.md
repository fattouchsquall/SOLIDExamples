# Exercice 2 — Ouvert/fermé

> 🇬🇧 [Read in English](README.md)

📖 Principe : [Principe ouvert/fermé](../../principles/02-open-closed/README.fr.md)

## La situation

Un `ReportExporter` transforme une liste de ventes en fichier, en CSV, JSON ou HTML. Ouvre le code de départ dans ton langage :

- [`typescript/exercise.ts`](typescript/exercise.ts)
- [`nodejs/exercise.js`](nodejs/exercise.js)
- [`php/Exercise.php`](php/Exercise.php)
- [`python/exercise.py`](python/exercise.py)
- [`java/Exercise.java`](java/Exercise.java)
- [`go/exercise/exercise.go`](go/exercise/exercise.go)
- [`csharp/Exercise.cs`](csharp/Exercise.cs)

Aujourd'hui, un collègue demande un export **Markdown** pour coller les rapports dans le wiki. Le mois prochain, quelqu'un demandera sûrement du XML, puis de l'Excel…

## Ta mission

1. Refactore `ReportExporter` pour qu'ajouter un nouveau format **ne demande pas de le modifier**.
2. Ajoute ensuite le format Markdown, qui doit produire :

```
| product | sales |
|---|---|
| Keyboard | 120 |
| Mouse | 80 |
```

3. CSV, JSON et HTML doivent produire exactement le même résultat qu'avant.
4. Un format inconnu doit toujours lever `Unsupported format: <format>`.

## C'est réussi quand

- [ ] Ajouter le Markdown a seulement demandé de **créer** du code, pas de modifier `ReportExporter`.
- [ ] Chaque format peut être testé seul.
- [ ] Il n'y a plus de `switch` ni de `match` sur le format.

## Indices

<details>
<summary>Indice 1 : quel est le contrat commun ?</summary>

Chaque format prend la même entrée (une liste de lignes) et renvoie le même type de sortie (une chaîne). C'est une interface avec une seule méthode : `export(rows)`.
</details>

<details>
<summary>Indice 2 : comment ReportExporter trouve-t-il le bon format ?</summary>

Donne-lui une table qui associe un nom de format à un exporteur, par son constructeur : `{ csv: new CsvExporter(), json: new JsonExporter(), ... }`. Il cherche le format dans la table et lui délègue le travail.
</details>

<details>
<summary>Indice 3 : qui décide des formats disponibles ?</summary>

Le code qui **crée** le `ReportExporter`. Ajouter un format, c'est ajouter une ligne à cet endroit, plus la nouvelle classe.
</details>

## Essayer

```ts
import { ReportExporter } from './exercise.ts';

const rows = [
  { product: 'Keyboard', sales: 120 },
  { product: 'Mouse', sales: 80 },
];

console.log(new ReportExporter().export('csv', rows));
```

## Solution

Essaie d'abord seul ! Puis compare avec :

- [`typescript/solution.ts`](typescript/solution.ts)
- [`nodejs/solution.js`](nodejs/solution.js)
- [`php/Solution.php`](php/Solution.php)
- [`python/solution.py`](python/solution.py)
- [`java/Solution.java`](java/Solution.java)
- [`go/solution/solution.go`](go/solution/solution.go)
- [`csharp/Solution.cs`](csharp/Solution.cs)

⬅️ Exercice précédent : [Responsabilité unique](../01-single-responsibility/README.fr.md) · ➡️ Exercice suivant : [Substitution de Liskov](../03-liskov-substitution/README.fr.md)
