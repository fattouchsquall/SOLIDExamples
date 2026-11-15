# Exercices

> 🇬🇧 [Read in English](README.md)

Un exercice par principe. Chacun te donne un code qui fonctionne mais qui est mal conçu, et te demande de le refactorer.

| # | Exercice | Situation |
|---|---|---|
| 1 | [Responsabilité unique](01-single-responsibility/README.fr.md) | Une classe d'inscription qui valide, hache, stocke et envoie un email |
| 2 | [Ouvert/fermé](02-open-closed/README.fr.md) | Un export de rapport qui a besoin d'un nouveau format Markdown |
| 3 | [Substitution de Liskov](03-liskov-substitution/README.fr.md) | Un compte épargne bloqué qui fait planter le prélèvement mensuel |
| 4 | [Ségrégation des interfaces](04-interface-segregation/README.fr.md) | Une interface de stockage que le disque local ne peut pas respecter entièrement |
| 5 | [Inversion des dépendances](05-dependency-inversion/README.fr.md) | Un bulletin météo impossible à tester à cause de l'API et de l'horloge |

## Comment faire un exercice

1. Lis d'abord le principe, dans [`principles/`](../principles).
2. Ouvre le `README` de l'exercice et le fichier `exercise` dans ton langage.
3. Refactore le code directement dans le fichier `exercise`, ou copie-le dans un nouveau fichier.
4. Coche chaque case de la liste « C'est réussi quand ».
5. N'utilise les indices que si tu bloques, un à la fois.
6. Compare avec le fichier `solution`. Le tien n'a pas besoin d'être identique : ce qui compte, c'est que le principe soit respecté.

Chaque fichier `exercise` est autonome : tu peux l'importer depuis un petit script et le lancer avec `node`, `php`, `python3`, `java`, `go run` ou `dotnet run` pour vérifier que le comportement ne change pas.
