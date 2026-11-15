# Exercice 4 — Ségrégation des interfaces

> 🇬🇧 [Read in English](README.md)

📖 Principe : [Principe de ségrégation des interfaces](../../principles/04-interface-segregation/README.fr.md)

## La situation

Une application stocke ses rapports soit sur S3 (en production), soit sur le disque local (en développement). Les deux stockages implémentent une seule interface `FileStorage` avec quatre méthodes : `read`, `write`, `delete` et `signedUrl`.

Ouvre le code de départ dans ton langage :

- [`typescript/exercise.ts`](typescript/exercise.ts)
- [`nodejs/exercise.js`](nodejs/exercise.js)
- [`php/Exercise.php`](php/Exercise.php)

> Les stockages sont simulés en mémoire, tu peux donc tout lancer sans compte AWS.

Les problèmes que l'équipe rencontre sans arrêt :

- Le disque local ne sait pas générer d'URL signée, donc `LocalDiskStorage.signedUrl()` lève une erreur. Personne ne s'en rend compte avant que le bouton « Partager » plante en développement.
- `ReportViewer` ne fait que lire des fichiers, mais demande un `FileStorage` complet. Pour le tester, il faut un faux avec quatre méthodes.
- L'équipe veut ajouter une méthode `copy()` pour S3. Avec la conception actuelle, `LocalDiskStorage` et tous les faux des tests devraient l'implémenter aussi.

## Ta mission

1. Découpe `FileStorage` en interfaces plus petites, regroupées selon **ce que les clients utilisent vraiment**.
2. Fais en sorte que chaque stockage n'implémente que ce qu'il sait réellement faire.
3. Fais en sorte que `ReportViewer` et `ReportSharer` ne demandent que ce dont ils ont besoin.
4. Passer un `LocalDiskStorage` à `ReportSharer` doit devenir une erreur de compilation en TypeScript et une erreur de type en PHP.

## C'est réussi quand

- [ ] Aucune méthode ne lève « je ne sais pas faire ça ».
- [ ] Un faux pour tester `ReportViewer` n'a besoin que d'une méthode `read()`.
- [ ] Ajouter une nouvelle capacité à S3 n'oblige à rien changer dans `LocalDiskStorage`.

## Indices

<details>
<summary>Indice 1 : combien d'interfaces ?</summary>

Regarde qui appelle quoi. `ReportViewer` lit. `ReportSharer` génère des URL signées. Écrire et supprimer vont en général ensemble (un service d'upload, une tâche de nettoyage). Ça fait trois rôles : lire, écrire, partager.
</details>

<details>
<summary>Indice 2 : une classe peut-elle implémenter plusieurs interfaces ?</summary>

Oui. `S3Storage` peut implémenter les trois rôles, `LocalDiskStorage` seulement la lecture et l'écriture. En TypeScript : `class S3Storage implements A, B, C`. En PHP : `final class S3Storage implements A, B, C`.
</details>

<details>
<summary>Indice 3 : et en JavaScript ?</summary>

Il n'y a pas de mot-clé `interface`, mais l'idée est la même : retire `signedUrl()` de `LocalDiskStorage` au lieu de lui faire lever une erreur, et nomme les paramètres du constructeur d'après le rôle qu'ils jouent (`urls`, `reader`…), pas d'après le stockage entier.
</details>

## Solution

Essaie d'abord seul ! Puis compare avec :

- [`typescript/solution.ts`](typescript/solution.ts)
- [`nodejs/solution.js`](nodejs/solution.js)
- [`php/Solution.php`](php/Solution.php)

⬅️ Exercice précédent : [Substitution de Liskov](../03-liskov-substitution/README.fr.md) · ➡️ Exercice suivant : [Inversion des dépendances](../05-dependency-inversion/README.fr.md)
