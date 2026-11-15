# Contribuer

> 🇬🇧 [Read in English](CONTRIBUTING.md)

Merci d'aider les débutants à apprendre SOLID ! Toutes les contributions sont les bienvenues, de la correction d'une faute de frappe à un nouveau langage complet.

## Comment contribuer

- 🐛 **Corriger une erreur** dans le code, les explications ou les traductions.
- 💡 **Clarifier une explication** qui t'a embrouillé : si elle t'a embrouillé, elle en embrouille d'autres.
- 🌍 **Améliorer une traduction** : chaque page existe en anglais (`README.md`) et en français (`README.fr.md`).
- 🧩 **Ajouter un langage** : voir [la checklist plus bas](#ajouter-un-langage).

Pour tout ce qui dépasse une petite correction, ouvre d'abord une issue pour qu'on se mette d'accord sur l'approche.

## Les règles du dépôt

Ce dépôt s'adresse aux débutants, et sa valeur vient de sa cohérence. Merci de respecter ces règles :

1. **Le même exemple dans tous les langages.** Mêmes noms de classes, mêmes noms de méthodes (adaptés à la convention de nommage du langage), mêmes messages d'erreur, même sortie de démo. Un lecteur doit pouvoir changer de langage et tout reconnaître.
2. **Le même comportement dans `bad` et `good`.** Le refactoring change la structure, jamais le résultat. Les démos le prouvent.
3. **Une version par fichier.** Toutes les classes de la version « mauvaise » sont dans un fichier, toutes celles de la version « bonne » dans un autre, pour que chacune se lise de haut en bas.
4. **Pas de commentaires dans le code.** Les explications vont dans le `README`, dans les deux langues. Le code doit parler de lui-même grâce à de bons noms.
5. **Pas de dépendances** sauf s'il n'y a pas d'alternative raisonnable. Préfère l'outil de test intégré à chaque langage. Les seules exceptions aujourd'hui sont PHPUnit, JUnit et xUnit.
6. **Rester simple.** Pas de framework, pas d'astuce, pas de fonctionnalité avancée du langage quand une basique suffit. Si un débutant doit chercher quelque chose, ce doit être le principe, pas la syntaxe.
7. **L'anglais et le français restent alignés.** Si tu modifies l'un, modifie l'autre, ou indique dans ta pull request qu'une traduction est nécessaire.

## Vérifier tes changements en local

```bash
make node     # TypeScript et Node.js
make php      # PHP
make python   # Python
make java     # Java
make go       # Go
make csharp   # C#
```

Lance aussi les démos que tu as modifiées et vérifie qu'« avant » et « après » affichent le même résultat. La [CI](.github/workflows/ci.yml) lance tout ça sur chaque pull request.

## Anatomie d'un principe

```
principles/0N-nom/
├── README.md / README.fr.md
└── <langage>/
    ├── bad      la version qui fonctionne mais viole le principe
    ├── good     la version refactorée
    ├── demo     lance les deux et affiche les résultats
    └── test     teste seulement la bonne version
```

Chaque `README` de principe suit le même plan :

1. **Titre et citation** : le principe et sa formulation d'origine.
2. **En clair** : l'idée sans jargon.
3. **Le problème** : un extrait de `bad`, et pourquoi ça fait mal, avec une demande de changement concrète.
4. **La solution** : un extrait de `good`, et ce qui est devenu facile.
5. **Remarques par langage** si besoin (par exemple « Et en JavaScript ? »).
6. **Lancer l'exemple** : une commande par langage.
7. **Signaux d'alerte** : comment repérer le problème dans du vrai code.
8. **Ne pas en faire trop** : quand appliquer le principe devient nuisible.
9. **Pour aller plus loin** : les liens vers l'exercice et vers les principes précédent et suivant.

Chaque exercice contient un `README` (situation, mission, liste « C'est réussi quand », indices dans des `<details>`, liens vers les solutions) et, pour chaque langage, un fichier `exercise` à refactorer et un fichier `solution`.

## Ajouter un langage

Merci pour l'ambition ! Voici tout ce dont un nouveau langage a besoin, pour ne rien oublier. Ouvre d'abord une issue pour fixer les conventions (comment écrire les interfaces et les objets valeur, quel outil de test).

### Code

- [ ] `principles/0N-*/<langage>/` pour les 5 principes : `bad`, `good`, `demo` et un fichier de test, selon la convention de nommage du langage.
- [ ] `exercises/0N-*/<langage>/` pour les 5 exercices : `exercise` et `solution`.
- [ ] Les démos se lancent en une seule commande, sans compilation si le langage le permet.
- [ ] Le format des nombres ne dépend pas de la langue de la machine (`125.00`, jamais `125,00`).

### Outillage

- [ ] Une cible `make <langage>` dans le [`Makefile`](Makefile), qui lance les tests et vérifie que les exercices compilent, et son ajout à `make test`.
- [ ] Un job dans [`.github/workflows/ci.yml`](.github/workflows/ci.yml) qui lance `make <langage>` et toutes les démos.
- [ ] Un service dans [`compose.yaml`](compose.yaml) dont la commande par défaut est `make <langage>`, avec un Dockerfile dans [`docker/`](docker) seulement si l'image officielle n'a pas un outil comme `make`.
- [ ] Les fichiers de build et les caches ajoutés au [`.gitignore`](.gitignore).

### Documentation, en anglais et en français

- [ ] La commande « Lancer l'exemple » dans les 10 `README` de principes.
- [ ] Les liens `exercise` et `solution` dans les 10 `README` d'exercices.
- [ ] Les remarques propres au langage dans les exercices quand les indices parlent de syntaxe.
- [ ] Dans `README.md` et `README.fr.md` à la racine : l'introduction, le tableau des prérequis, « Lancer une démo », « Lancer les tests », le tableau « Langages » et l'arborescence.
- [ ] La commande de lancement dans `exercises/README.md` et `exercises/README.fr.md`.

## Pull requests

- Garde des pull requests petites et ciblées : un principe, un langage ou une correction à la fois, c'est plus facile à relire.
- Décris ce que tu as changé et pourquoi. Pour un nouvel exemple ou exercice, explique ce qu'un débutant doit en retenir.
- Reste bienveillant dans les revues et les discussions. Tout le monde ici a été débutant un jour.

En contribuant, tu acceptes que tes contributions soient publiées sous [licence MIT](LICENSE).
