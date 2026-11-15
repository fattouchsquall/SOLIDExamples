# Exercice 3 — Substitution de Liskov

> 🇬🇧 [Read in English](README.md)

📖 Principe : [Principe de substitution de Liskov](../../principles/03-liskov-substitution/README.fr.md)

## La situation

Une banque modélise ses comptes avec une classe `BankAccount`. Un nouveau produit arrive : le **compte épargne bloqué**, qui rapporte des intérêts mais n'autorise aucun retrait avant son échéance. Un développeur en a fait une sous-classe de `BankAccount` et a redéfini `withdraw()` pour lever une erreur.

Ouvre le code de départ dans ton langage :

- [`typescript/exercise.ts`](typescript/exercise.ts)
- [`nodejs/exercise.js`](nodejs/exercise.js)
- [`php/Exercise.php`](php/Exercise.php)

En fin de mois, le traitement qui prélève les frais de tenue de compte plante :

```ts
chargeMonthlyFee([new BankAccount(100), new LockedSavingsAccount(1000)], 2);
// Error: Withdrawals are locked until maturity
```

`chargeMonthlyFee` a été écrite pour `BankAccount` et n'a rien fait de mal. C'est la sous-classe qui a cassé une promesse de son parent.

## Ta mission

1. Trouve la promesse que fait `BankAccount` et que `LockedSavingsAccount` ne peut pas tenir.
2. Revois les classes pour que **chaque sous-classe puisse remplacer entièrement son parent**.
3. `chargeMonthlyFee` ne doit plus accepter de compte épargne bloqué. Idéalement, en passer un doit être une erreur de compilation en TypeScript ou une erreur de type en PHP.
4. Ajoute une fonction `totalBalance(accounts)` qui fonctionne avec **tous** les types de comptes.

## C'est réussi quand

- [ ] Aucune méthode ne lève d'erreur juste parce que « ce type de compte ne sait pas faire ça ».
- [ ] `chargeMonthlyFee` ne reçoit que des comptes qui acceptent les retraits.
- [ ] `totalBalance` accepte aussi bien les comptes courants que les comptes épargne bloqués.
- [ ] Aucun test `instanceof` nulle part.

## Indices

<details>
<summary>Indice 1 : qu'ont vraiment en commun tous les comptes ?</summary>

Tous les comptes ont un solde et acceptent des dépôts. Seuls *certains* comptes autorisent les retraits. La classe parente ne doit contenir que ce que **tous** les enfants peuvent honorer.
</details>

<details>
<summary>Indice 2 : faut-il abandonner l'héritage ?</summary>

Non ! L'héritage est correct quand le parent ne promet que ce que chaque enfant sait faire. Une classe de base `Account` avec `balance()` et `deposit()`, et deux enfants `CheckingAccount` (qui ajoute `withdraw()`) et `LockedSavingsAccount` (qui ajoute `addInterest()`), respecte le LSP.
</details>

<details>
<summary>Indice 3 : quel type chaque fonction doit-elle demander ?</summary>

Demande le **plus petit** type qui a ce dont tu as besoin : `chargeMonthlyFee` a besoin de `withdraw()`, elle demande donc des comptes courants. `totalBalance` n'a besoin que de `balance()`, elle accepte donc n'importe quel `Account`.
</details>

## Solution

Essaie d'abord seul ! Puis compare avec :

- [`typescript/solution.ts`](typescript/solution.ts)
- [`nodejs/solution.js`](nodejs/solution.js)
- [`php/Solution.php`](php/Solution.php)

Découper en interfaces comme `Account` et `WithdrawableAccount` est aussi une bonne réponse. Remarque à quel point c'est proche du [principe de ségrégation des interfaces](../../principles/04-interface-segregation/README.fr.md), qui arrive juste après.

⬅️ Exercice précédent : [Ouvert/fermé](../02-open-closed/README.fr.md) · ➡️ Exercice suivant : [Ségrégation des interfaces](../04-interface-segregation/README.fr.md)
