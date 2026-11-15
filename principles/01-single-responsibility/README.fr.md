# S — Principe de responsabilité unique (SRP)

> 🇬🇧 [Read in English](README.md)

> **Une classe ne devrait avoir qu'une seule raison de changer.**
> — Robert C. Martin

## En clair

Une « responsabilité », ce n'est pas « une méthode » ni « une chose que fait la classe ». C'est **une raison de changer**, c'est-à-dire en général **une personne ou une équipe qui peut te demander de la modifier**.

Si le comptable, le designer et l'équipe ops peuvent tous te demander de modifier la même classe, cette classe a trois responsabilités.

## Le problème

[`typescript/bad.ts`](typescript/bad.ts) contient une seule classe `Invoice` qui fait tout :

```ts
export class Invoice {
  subtotal(): number { /* ... */ }
  vat(): number { return this.subtotal() * 0.2; }   // règles de prix
  total(): number { /* ... */ }
  toText(): string { /* ... */ }                      // affichage
  save(directory: string): string { /* ... */ }       // stockage
}
```

Ça fonctionne, mais compte les raisons de changer :

| Qui demande ? | Qu'est-ce qui change ? | Où ? |
|---|---|---|
| Le comptable | La TVA passe de 20 % à 10 % | `Invoice` |
| Le designer | La facture doit s'afficher en HTML | `Invoice` |
| L'équipe ops | Les factures doivent aller sur S3, pas sur le disque | `Invoice` |

Trois personnes différentes, un seul fichier. Chaque modification risque de casser les deux autres fonctionnalités, et impossible de tester le texte sans charger aussi le code qui écrit sur le disque.

## La solution

[`typescript/good.ts`](typescript/good.ts) découpe la classe selon ces trois raisons :

| Classe | Responsabilité | Change quand… |
|---|---|---|
| `Invoice` | Porte les données | Les données de la facture changent |
| `InvoiceCalculator` | Calcule le sous-total, la TVA et le total | Les règles de prix changent |
| `InvoiceTextFormatter` | Met la facture en texte | Le format d'affichage change |
| `InvoiceFileStorage` | Écrit la facture sur le disque | Le stockage change |

```ts
const invoice = new Invoice('INV-002', 'Alice', lines);
const formatter = new InvoiceTextFormatter(new InvoiceCalculator(0.2));
const storage = new InvoiceFileStorage(tmpdir());

storage.save(invoice, formatter.format(invoice));
```

Maintenant :

- Un nouveau taux de TVA, c'est juste `new InvoiceCalculator(0.1)`, rien d'autre ne bouge.
- Un affichage HTML, c'est un nouveau `InvoiceHtmlFormatter`, celui en texte reste intact.
- Les tests de [`typescript/good.test.ts`](typescript/good.test.ts) vérifient les calculs et le texte sans écrire un seul fichier.

## Lancer l'exemple

```bash
node principles/01-single-responsibility/typescript/demo.ts
node principles/01-single-responsibility/nodejs/demo.js
php principles/01-single-responsibility/php/demo.php
python3 principles/01-single-responsibility/python/demo.py
java principles/01-single-responsibility/java/Demo.java
go run ./principles/01-single-responsibility/go/demo
dotnet run --project principles/01-single-responsibility/csharp
```

Les deux versions affichent la même facture : **le comportement n'a pas changé, seule la structure a changé**. C'est exactement ce qu'on attend d'un bon refactoring.

## Signaux d'alerte

- Le nom de la classe finit par `Manager`, `Handler`, `Processor` ou `Service` et elle ne fait que grossir.
- Tu as besoin du mot « et » pour décrire ce que fait la classe.
- Le fichier importe des mondes très différents : calcul, HTML, fichiers, HTTP, base de données…
- Deux personnes modifient souvent le même fichier pour des raisons sans rapport, et se retrouvent en conflit.
- Tester une petite règle t'oblige à préparer une base de données ou un serveur mail.

## Ne pas en faire trop

SRP ne veut pas dire « une méthode par classe ». Séparer `subtotal()`, `vat()` et `total()` en trois classes rendrait le code plus difficile à lire sans rien apporter : elles changent toutes pour la même raison (les règles de prix), donc elles vont ensemble.

Demande-toi **« qui me demanderait de changer ça ? »** plutôt que « combien de choses ça fait ? ».

## Pour aller plus loin

- 🏋️ Exercice : [`exercises/01-single-responsibility`](../../exercises/01-single-responsibility/README.fr.md)
- ➡️ Principe suivant : [Principe ouvert/fermé](../02-open-closed/README.fr.md)
