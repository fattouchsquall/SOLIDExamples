# L — Principe de substitution de Liskov (LSP)

> 🇬🇧 [Read in English](README.md)

> **Un objet d'une sous-classe doit pouvoir être utilisé partout où un objet de la classe parente est attendu, sans casser le programme.**
> — Barbara Liskov, reformulé

## En clair

Si un bout de code fonctionne avec un `Rectangle`, il doit continuer à fonctionner quand on lui donne **n'importe quelle** sous-classe de `Rectangle`. Pas de surprise, pas de cas particulier, pas de `if (shape instanceof Square)`.

L'héritage ne se décide pas sur « est un » dans le monde réel. Il se décide sur la capacité à **tenir les promesses** de la classe parente.

## Le problème

En mathématiques, un carré *est un* rectangle. [`typescript/bad.ts`](typescript/bad.ts) fait donc la chose évidente :

```ts
export class Square extends Rectangle {
  override setWidth(width: number): void {
    this.width = width;
    this.height = width;   // un carré doit rester carré...
  }
  // pareil pour setHeight
}
```

Regarde maintenant cette fonction, écrite par quelqu'un qui ne connaît que `Rectangle` :

```ts
export function resize(rectangle: Rectangle, width: number, height: number): number {
  rectangle.setWidth(width);
  rectangle.setHeight(height);
  return rectangle.area();
}
```

```
resize(rectangle, 4, 5) = 20 (expected 20)
resize(square, 4, 5)    = 25 (expected 20!)
```

`Rectangle` fait une promesse implicite : *changer la hauteur ne change pas la largeur*. `Square` la casse. Le compilateur ne dit rien, le code tourne, et le résultat est faux sans aucun message. Chaque fonction qui accepte un `Rectangle` devient un bug potentiel.

## La solution

[`typescript/good.ts`](typescript/good.ts) arrête de faire comme si un carré était un rectangle particulier. Les deux implémentent un contrat commun `Shape` qu'ils peuvent **tous les deux respecter entièrement** :

```ts
export interface Shape {
  area(): number;
}

export class Rectangle implements Shape { /* width, height */ }
export class Square implements Shape { /* side */ }

export function totalArea(shapes: Shape[]): number {
  return shapes.reduce((sum, shape) => sum + shape.area(), 0);
}
```

Deux autres changements aident :

- Les formes sont **immuables** (`readonly`) : sans setter, pas de promesse sur les setters à casser.
- `totalArea` ne s'appuie que sur ce que `Shape` garantit. Les [tests](typescript/good.test.ts) ajoutent un `Triangle` après coup, et `totalArea` fonctionne avec lui sans changement.

### Et en Go ?

Go n'a ni classes ni héritage, et pourtant le LSP s'applique, parce qu'il parle de **contrats**, pas d'`extends`. Dans [`go/bad/bad.go`](go/bad/bad.go), `Square` embarque `Rectangle` et redéfinit ses setters, et `Resize` accepte n'importe quelle interface `Resizable`. `Square` satisfait l'interface, le compilateur ne dit rien, et le résultat est tout aussi faux. Chaque type qui implémente une interface doit respecter ce qu'elle promet.

## Les règles derrière le LSP

Une sous-classe respecte le LSP quand elle :

| Règle | Exemple de violation |
|---|---|
| N'exige pas **plus** que son parent (préconditions) | Le parent accepte n'importe quel montant, l'enfant lève une erreur au-dessus de 100 |
| Ne fournit pas **moins** que son parent (postconditions) | Le parent renvoie toujours une liste, l'enfant renvoie parfois `null` |
| Garde les **invariants** du parent | `Square` change la largeur quand on modifie la hauteur |
| Ne lève pas de **nouveaux types d'erreurs** | `Penguin extends Bird` et `fly()` lève `CannotFlyError` |

## Lancer l'exemple

```bash
node principles/03-liskov-substitution/typescript/demo.ts
node principles/03-liskov-substitution/nodejs/demo.js
php principles/03-liskov-substitution/php/demo.php
python3 principles/03-liskov-substitution/python/demo.py
java principles/03-liskov-substitution/java/Demo.java
go run ./principles/03-liskov-substitution/go/demo
dotnet run --project principles/03-liskov-substitution/csharp
```

## Signaux d'alerte

- Une sous-classe redéfinit une méthode pour **lever** `NotImplemented`, ou pour ne rien faire.
- Le code appelant vérifie le type concret : `instanceof`, `typeof`, `get_class()`.
- Une sous-classe redéfinit une méthode et change le sens du résultat d'**une autre** méthode.
- Les tests écrits pour la classe parente échouent quand on les lance sur la sous-classe.

## Ne pas en faire trop

Le LSP n'est pas un argument contre l'héritage. Il dit **quand** l'héritage est sûr : quand l'enfant sait faire tout ce que le parent promet.

Quand ce n'est pas le cas, préfère une interface commune (comme `Shape` ici) ou la composition. « Est un » dans la vraie vie est un indice, pas une preuve.

## Pour aller plus loin

- 🏋️ Exercice : [`exercises/03-liskov-substitution`](../../exercises/03-liskov-substitution/README.fr.md)
- ⬅️ Principe précédent : [Principe ouvert/fermé](../02-open-closed/README.fr.md)
- ➡️ Principe suivant : [Principe de ségrégation des interfaces](../04-interface-segregation/README.fr.md)
