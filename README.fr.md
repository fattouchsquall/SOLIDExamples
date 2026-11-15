# SOLID Examples

> 🇬🇧 [Read in English](README.md)

Une boîte à outils pour débutants, pour **comprendre les principes SOLID** et voir comment les appliquer, avec les mêmes exemples écrits en **TypeScript**, **Node.js** et **PHP**.

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

- [Node.js](https://nodejs.org) 24 ou plus, pour les exemples TypeScript et Node.js
- [PHP](https://www.php.net) 8.2 ou plus, pour les exemples PHP
- [Composer](https://getcomposer.org), seulement pour lancer les tests PHP

Les fichiers TypeScript se lancent directement avec `node`, grâce à la suppression des types intégrée. Aucune compilation n'est nécessaire.

### Installer

```bash
git clone <repository-url>
cd solid-examples
npm install
composer install
```

### Lancer une démo

```bash
node principles/01-single-responsibility/typescript/demo.ts
node principles/01-single-responsibility/nodejs/demo.js
php principles/01-single-responsibility/php/demo.php
```

### Lancer les tests

```bash
npm test            # tests TypeScript et Node.js (node:test)
npm run typecheck   # vérification des types TypeScript
composer test       # tests PHP (PHPUnit)
```

## Comment utiliser ce dépôt

1. Lis les principes **dans l'ordre** : chacun s'appuie sur les précédents.
2. Pour chaque principe, lis le `README`, puis ouvre `bad` et `good` côte à côte dans ton éditeur.
3. Lance la démo et vérifie que les deux versions affichent le même résultat.
4. Lis les tests pour voir ce que la bonne version rend facile.
5. Fais l'exercice **avant** de regarder la solution.
6. À la fin, teste-toi avec le [quiz](QUIZ.fr.md) et garde la [fiche mémo](CHEATSHEET.fr.md) sous la main.

Choisis le langage avec lequel tu es le plus à l'aise. Les trois versions sont volontairement aussi proches que possible, tu peux donc aussi comparer comment chaque langage exprime la même idée.

## Structure

```
solid-examples/
├── principles/
│   ├── 01-single-responsibility/
│   │   ├── README.md / README.fr.md
│   │   ├── typescript/   bad.ts  good.ts  demo.ts  good.test.ts
│   │   ├── nodejs/       bad.js  good.js  demo.js  good.test.js
│   │   └── php/          Bad.php Good.php demo.php GoodTest.php
│   ├── 02-open-closed/
│   ├── 03-liskov-substitution/
│   ├── 04-interface-segregation/
│   └── 05-dependency-inversion/
├── exercises/
│   ├── 01-single-responsibility/
│   │   ├── README.md / README.fr.md
│   │   ├── typescript/   exercise.ts  solution.ts
│   │   ├── nodejs/       exercise.js  solution.js
│   │   └── php/          Exercise.php Solution.php
│   └── ...
├── CHEATSHEET.md / CHEATSHEET.fr.md
└── QUIZ.md / QUIZ.fr.md
```

Pour que chaque exemple se lise de haut en bas, toutes les classes d'une version sont dans un seul fichier. Dans un vrai projet, on mettrait une classe par fichier.

## Licence

[MIT](LICENSE)
