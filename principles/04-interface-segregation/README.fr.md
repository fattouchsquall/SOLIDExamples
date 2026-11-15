# I — Principe de ségrégation des interfaces (ISP)

> 🇬🇧 [Read in English](README.md)

> **Un client ne devrait pas être obligé de dépendre de méthodes qu'il n'utilise pas.**
> — Robert C. Martin

## En clair

Préfère **plusieurs petites interfaces ciblées** à une grosse interface « qui fait tout ».

Une classe ne doit promettre que ce qu'elle sait vraiment faire, et une fonction ne doit demander que ce dont elle a vraiment besoin.

## Le problème

[`typescript/bad.ts`](typescript/bad.ts) définit une seule interface pour toutes les machines de bureau :

```ts
export interface Machine {
  print(document: string): string;
  scan(document: string): string;
  fax(document: string, phoneNumber: string): string;
}
```

Pour une imprimante multifonction, pas de souci. Mais une imprimante simple ne sait qu'imprimer, et elle est **obligée** d'implémenter le reste :

```ts
export class SimplePrinter implements Machine {
  print(document: string): string { return `Printing "${document}"`; }
  scan(): string { throw new Error('SimplePrinter cannot scan'); }
  fax(): string { throw new Error('SimplePrinter cannot fax'); }
}
```

Ce qui ne va pas :

- **Le typage ment** : `SimplePrinter` prétend savoir scanner. Le compilateur la croit, donc appeler `scan()` compile, puis plante à l'exécution.
- **Un couplage inutile** : `printReport()` ne fait qu'imprimer, mais demande une `Machine` entière. Ajoute une méthode `staple()` à `Machine` et toutes les classes doivent changer, même celles qui n'ont rien à voir avec l'agrafage.
- **Des tests pénibles** : un faux pour `printReport()` doit implémenter trois méthodes, dont deux pour rien.

Remarque que lever une erreur dans `scan()` **viole aussi le LSP** : une `SimplePrinter` ne peut pas remplacer une `Machine`. Les deux principes vont souvent ensemble.

## La solution

[`typescript/good.ts`](typescript/good.ts) découpe la grosse interface en rôles :

```ts
export interface Printer { print(document: string): string; }
export interface Scanner { scan(document: string): string; }
export interface Fax { fax(document: string, phoneNumber: string): string; }

export class SimplePrinter implements Printer { /* impression seulement */ }
export class AllInOnePrinter implements Printer, Scanner, Fax { /* les trois */ }
```

Et chaque fonction ne demande que le rôle dont elle a besoin :

```ts
export function printReport(printer: Printer, report: string): string { /* ... */ }
export function archive(scanner: Scanner, document: string): string { /* ... */ }
```

Maintenant :

- `archive(new SimplePrinter(), '...')` **ne compile pas**. Le bug est détecté avant l'exécution.
- L'imprimante multifonction peut être passée à `printReport` *et* à `archive`.
- Un faux pour tester `printReport` est un objet d'une seule méthode (voir [les tests](typescript/good.test.ts)).

### Et en JavaScript ?

JavaScript n'a pas d'interfaces, le compilateur ne peut donc rien t'« obliger » à implémenter. Le principe s'applique quand même à tes **classes et classes de base** : ne donne pas à une classe des méthodes qu'elle ne sait pas honorer (comme `scan()` qui lève une erreur dans [`nodejs/bad.js`](nodejs/bad.js)), et garde les objets attendus par tes fonctions aussi petits que possible. Dans [`nodejs/good.js`](nodejs/good.js), `SimplePrinter` n'a tout simplement pas de méthode `scan`.

### Et en Go ?

Les petites interfaces, c'est l'esprit de Go : la bibliothèque standard repose sur des interfaces d'une seule méthode comme `io.Reader` et `io.Writer`. Dans [`go/bad/bad.go`](go/bad/bad.go), remarque comment la grosse interface `Machine` oblige `Scan` et `Fax` à renvoyer une `error` sur **toutes** les machines, juste parce que l'une d'elles ne sait pas le faire. Dans [`go/good/good.go`](go/good/good.go), les erreurs disparaissent avec le mensonge.

## Lancer l'exemple

```bash
node principles/04-interface-segregation/typescript/demo.ts
node principles/04-interface-segregation/nodejs/demo.js
php principles/04-interface-segregation/php/demo.php
python3 principles/04-interface-segregation/python/demo.py
java principles/04-interface-segregation/java/Demo.java
go run ./principles/04-interface-segregation/go/demo
dotnet run --project principles/04-interface-segregation/csharp
```

## Signaux d'alerte

- Des méthodes qui font `throw new Error('Not implemented')` ou qui ont un corps vide juste pour satisfaire une interface.
- Une interface avec beaucoup de méthodes que la plupart des implémentations n'utilisent qu'en partie.
- Une fonction qui reçoit un gros objet mais n'appelle qu'une seule de ses méthodes.
- Ajouter une méthode à une interface t'oblige à modifier des classes qui ne l'utiliseront jamais.

## Ne pas en faire trop

Le but n'est pas une méthode par interface. Regroupe les méthodes qui sont **toujours utilisées ensemble** par les mêmes clients. Un `Printer` avec `print()` et `cancelPrintJob()` serait parfaitement correct.

Découpe une interface quand tu vois un client qui n'en utilise qu'une partie, pas avant.

## Pour aller plus loin

- 🏋️ Exercice : [`exercises/04-interface-segregation`](../../exercises/04-interface-segregation/README.fr.md)
- ⬅️ Principe précédent : [Principe de substitution de Liskov](../03-liskov-substitution/README.fr.md)
- ➡️ Principe suivant : [Principe d'inversion des dépendances](../05-dependency-inversion/README.fr.md)
