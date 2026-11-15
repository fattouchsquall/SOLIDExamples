# Fiche mémo SOLID

> 🇬🇧 [Read in English](CHEATSHEET.md)

Garde cette page ouverte quand tu codes ou que tu fais une revue de code.

## Les cinq principes en un coup d'œil

| | Principe | Règle | Question à se poser |
|---|---|---|---|
| **S** | [Responsabilité unique](principles/01-single-responsibility/README.fr.md) | Une classe a une seule raison de changer. | *Qui pourrait me demander de modifier ça ?* |
| **O** | [Ouvert/fermé](principles/02-open-closed/README.fr.md) | On ajoute un comportement en ajoutant du code, pas en modifiant du code qui marche. | *Que dois-je modifier pour ajouter une nouvelle variante ?* |
| **L** | [Substitution de Liskov](principles/03-liskov-substitution/README.fr.md) | Un sous-type peut remplacer son parent sans surprise. | *Chaque enfant tient-il toutes les promesses du parent ?* |
| **I** | [Ségrégation des interfaces](principles/04-interface-segregation/README.fr.md) | Aucun client ne dépend de méthodes qu'il n'utilise pas. | *Cette classe ou cette fonction a-t-elle vraiment besoin de tout ça ?* |
| **D** | [Inversion des dépendances](principles/05-dependency-inversion/README.fr.md) | Le code métier dépend d'abstractions, pas d'outils. | *Puis-je tester ça sans base de données, sans réseau, sans horloge ?* |

## S — Responsabilité unique

| 🚨 Signaux d'alerte | ✅ Correction habituelle |
|---|---|
| Le nom de la classe finit par `Manager`, `Handler`, `Service`, et elle ne fait que grossir | Découper par **raison de changer** : calcul, mise en forme, stockage, notification… |
| Il faut le mot « et » pour décrire la classe | Garder une classe qui orchestre et délègue |
| Des imports de mondes très différents (calcul, HTML, SQL, HTTP) | Regrouper ce qui change ensemble, séparer ce qui change pour des raisons différentes |
| Tester une petite règle demande une base de données | Extraire la règle dans une classe sans effet de bord |

⚠️ **En faire trop** : une méthode par classe. Les méthodes qui changent pour la même raison vont ensemble.

## O — Ouvert/fermé

| 🚨 Signaux d'alerte | ✅ Correction habituelle |
|---|---|
| Un `switch` / `match` / une suite de `if-else` sur un type, une sorte, un fournisseur | Une classe par variante derrière une interface commune (**Strategy**) |
| Le même `switch` copié dans plusieurs fichiers | Une table qui associe une clé à une implémentation, construite hors de la classe |
| Chaque nouvelle demande commence par « ajoute un cas dans… » | Nouvelle variante = nouvelle classe + une ligne là où tout est assemblé |

⚠️ **En faire trop** : abstraire un `switch` de trois cas stables. Attends la deuxième ou troisième nouvelle variante.

## L — Substitution de Liskov

| 🚨 Signaux d'alerte | ✅ Correction habituelle |
|---|---|
| Une redéfinition qui lève `NotImplemented` ou ne fait rien | Sortir la méthode du parent : n'y garder que ce que **tous** les enfants savent faire |
| Des tests `instanceof` / `typeof` / `get_class()` dans le code appelant | Une interface commune que chaque classe peut respecter entièrement |
| Une sous-classe change l'effet d'**une autre** méthode (le piège `Square` / `Rectangle`) | Des objets immuables, ou la composition plutôt que l'héritage |
| Les tests du parent échouent sur l'enfant | Lancer les mêmes tests de contrat sur chaque implémentation |

Un sous-type ne doit pas :

- exiger **plus** que son parent (préconditions renforcées),
- fournir **moins** que son parent (postconditions affaiblies),
- casser les **invariants** du parent,
- lever de **nouveaux types d'erreurs**.

⚠️ **En faire trop** : interdire l'héritage. Il est correct quand l'enfant sait faire tout ce que le parent promet.

## I — Ségrégation des interfaces

| 🚨 Signaux d'alerte | ✅ Correction habituelle |
|---|---|
| Des méthodes implémentées juste pour lever une erreur ou rester vides | Découper l'interface par **rôle** : `Printer`, `Scanner`, `Fax` |
| Une fonction reçoit un gros objet mais n'appelle qu'une méthode | Demander la plus petite interface qui a ce dont on a besoin |
| Un faux pour les tests doit implémenter dix méthodes | Une classe peut implémenter plusieurs petites interfaces |
| Ajouter une méthode oblige à modifier des classes sans rapport | Regrouper les méthodes que les mêmes clients utilisent toujours ensemble |

⚠️ **En faire trop** : une méthode par interface par principe. Découpe quand un client n'en utilise qu'une partie.

## D — Inversion des dépendances

| 🚨 Signaux d'alerte | ✅ Correction habituelle |
|---|---|
| `new Database()`, `new HttpClient()`, `new Mailer()` dans le code métier | Définir une interface du point de vue du métier (`OrderRepository`, `Notifier`) |
| Le code métier importe directement un SDK externe | Passer les implémentations par le constructeur (**injection de dépendances**) |
| `new Date()`, `Math.random()`, `process.env` cachés dans la logique | Mettre aussi l'horloge, l'aléatoire et la configuration derrière de petites interfaces |
| Les tests ont besoin d'une base de données ou du réseau | Des faux en mémoire dans les tests, les vraies implémentations en production |

⚠️ **En faire trop** : une interface pour chaque classe. Les objets valeur (`Order`, une date comme donnée, un tableau) n'en ont pas besoin. Abstrais ce qui parle au monde extérieur.

## Comment ils fonctionnent ensemble

- Le **SRP** donne de petites classes. Le **DIP** les relie sans les attacher les unes aux autres.
- On atteint en général l'**OCP** grâce au **LSP** (chaque variante est un remplaçant sûr) et au **DIP** (le code dépend de l'abstraction, pas des variantes).
- Une méthode qui lève « non supporté » viole en général **à la fois le LSP et l'ISP**.
- Un code SOLID est **facile à tester** : si tester est pénible, l'un des cinq principes est probablement violé.

## Vocabulaire

| Terme | Sens |
|---|---|
| Abstraction | Une interface (ou classe abstraite) qui décrit *ce que* fait quelque chose, pas *comment* |
| Implémentation | Une classe concrète qui fait le vrai travail |
| Injection de dépendances | Donner à une classe ses dépendances de l'extérieur, en général par le constructeur |
| Doublure de test / faux | Une implémentation simple utilisée dans les tests à la place de la vraie |
| Duck typing | En JavaScript, n'importe quel objet qui a les bonnes méthodes convient, sans déclarer d'interface |
| Strategy | Un pattern où des comportements interchangeables partagent une même interface |

## Quand NE PAS appliquer SOLID à la lettre

- Les scripts jetables, les prototypes, les petits outils ponctuels.
- Le code qui n'a jamais changé et n'a aucune raison de changer.
- Quand l'abstraction rend le code plus difficile à lire que le problème qu'elle résout.

SOLID est un moyen de garder le code **facile à faire évoluer**. Si aucun changement n'arrive, le code simple gagne.
