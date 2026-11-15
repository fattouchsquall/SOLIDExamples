# Exercice 1 — Responsabilité unique

> 🇬🇧 [Read in English](README.md)

📖 Principe : [Principe de responsabilité unique](../../principles/01-single-responsibility/README.fr.md)

## La situation

Ton équipe a une classe `UserRegistration` qui inscrit les nouveaux utilisateurs. Ouvre le code de départ dans ton langage :

- [`typescript/exercise.ts`](typescript/exercise.ts)
- [`nodejs/exercise.js`](nodejs/exercise.js)
- [`php/Exercise.php`](php/Exercise.php)
- [`python/exercise.py`](python/exercise.py)
- [`java/Exercise.java`](java/Exercise.java)
- [`go/exercise/exercise.go`](go/exercise/exercise.go)
- [`csharp/Exercise.cs`](csharp/Exercise.cs)

Ça fonctionne, mais son unique méthode `register()` en fait beaucoup. Et les demandes s'enchaînent :

- L'équipe sécurité veut un algorithme de hachage plus solide.
- L'équipe produit veut des mots de passe d'au moins 12 caractères avec un chiffre.
- L'équipe marketing veut changer l'email de bienvenue.
- L'équipe ops veut stocker les utilisateurs dans une vraie base de données.

Quatre équipes, une seule méthode.

## Ta mission

1. Liste toutes les raisons que `UserRegistration` pourrait avoir de changer. Écris-les avant de coder.
2. Extrais une classe par raison.
3. Garde `UserRegistration` comme la classe qui **orchestre** l'inscription : elle appelle les autres dans le bon ordre.
4. Le comportement doit rester exactement le même : mêmes messages d'erreur, même email, même résultat.

## C'est réussi quand

- [ ] Changer les règles du mot de passe ne touche qu'une petite classe.
- [ ] Changer l'algorithme de hachage ne touche qu'une petite classe.
- [ ] Tu peux tester les règles de validation sans hacher, stocker ni envoyer quoi que ce soit.
- [ ] `register()` se lit comme une courte liste d'étapes.

## Indices

<details>
<summary>Indice 1 : combien de responsabilités ?</summary>

Il y en a quatre : **valider** la saisie, **hacher** le mot de passe, **stocker** l'utilisateur, **envoyer** l'email de bienvenue.
</details>

<details>
<summary>Indice 2 : où mettre la vérification « déjà inscrit » ?</summary>

Vérifier qu'un email n'est pas déjà pris demande de connaître les utilisateurs stockés. Ce n'est pas une simple validation de saisie comme le format de l'email. Laisse la classe de stockage répondre à « cet email existe-t-il ? », et laisse `UserRegistration` décider quoi faire de la réponse.
</details>

<details>
<summary>Indice 3 : comment UserRegistration récupère-t-elle les autres classes ?</summary>

Passe-les à son constructeur. Tu verras avec le [principe d'inversion des dépendances](../../principles/05-dependency-inversion/README.fr.md) pourquoi c'est si utile.
</details>

## Essayer

Écris un petit script à côté de ton code, par exemple en TypeScript :

```ts
import { UserRegistration } from './exercise.ts';

const registration = new UserRegistration();
console.log(registration.register('alice@example.com', 'super-secret'));
registration.register('alice@example.com', 'another-secret'); // lève une erreur
```

> ⚠️ SHA-256 est utilisé ici pour garder l'exemple court. Pour stocker de vrais mots de passe, utilise un algorithme dédié comme bcrypt ou Argon2.

## Solution

Essaie d'abord seul ! Puis compare avec :

- [`typescript/solution.ts`](typescript/solution.ts)
- [`nodejs/solution.js`](nodejs/solution.js)
- [`php/Solution.php`](php/Solution.php)
- [`python/solution.py`](python/solution.py)
- [`java/Solution.java`](java/Solution.java)
- [`go/solution/solution.go`](go/solution/solution.go)
- [`csharp/Solution.cs`](csharp/Solution.cs)

Ta solution n'a pas besoin d'être identique. Si chaque classe a une seule raison de changer, c'est gagné.

➡️ Exercice suivant : [Ouvert/fermé](../02-open-closed/README.fr.md)
