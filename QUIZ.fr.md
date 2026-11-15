# Quiz SOLID

> 🇬🇧 [Read in English](QUIZ.md)

15 questions pour vérifier ce que tu as retenu. Réponds à chaque question **avant** d'ouvrir la solution, et compte tes points à la fin.

---

## Les principes

### 1. Dans le principe de responsabilité unique, qu'est-ce qu'une « responsabilité » ?

- A) Une méthode
- B) Une raison de changer, en général liée à une personne ou une équipe qui demande des modifications
- C) Un fichier
- D) Une dépendance

<details>
<summary>Réponse</summary>

**B.** Une classe de dix méthodes peut avoir une seule responsabilité si elles changent toutes pour la même raison. Une classe de deux méthodes peut en avoir deux si deux équipes différentes peuvent te demander de les modifier.

📖 [Responsabilité unique](principles/01-single-responsibility/README.fr.md)
</details>

### 2. Vrai ou faux : le principe ouvert/fermé interdit de modifier un fichier existant.

<details>
<summary>Réponse</summary>

**Faux.** On corrigera toujours des bugs et on améliorera toujours le code. L'OCP veut dire qu'ajouter une nouvelle *variante* (un nouveau moyen de paiement, un nouveau format…) ne doit pas obliger à modifier et retester les variantes existantes.

📖 [Ouvert/fermé](principles/02-open-closed/README.fr.md)
</details>

### 3. Laquelle de ces sous-classes viole le principe de substitution de Liskov ?

- A) Une sous-classe qui ajoute une nouvelle méthode
- B) Une sous-classe qui renvoie parfois `null` là où le parent renvoie toujours une liste
- C) Une sous-classe qui redéfinit une méthode pour ajouter des logs, avec le même résultat
- D) Une sous-classe déclarée `final`

<details>
<summary>Réponse</summary>

**B.** Le parent promet une liste. Le code écrit pour le parent va appeler `.length` ou boucler sur le résultat, et planter sur `null`. La sous-classe fournit *moins* que ce que son parent promettait (une postcondition affaiblie).

📖 [Substitution de Liskov](principles/03-liskov-substitution/README.fr.md)
</details>

### 4. Le principe de ségrégation des interfaces s'applique-t-il encore en JavaScript, qui n'a pas de mot-clé `interface` ?

<details>
<summary>Réponse</summary>

**Oui.** En JavaScript les interfaces sont implicites, mais le problème est le même : ne donne pas à une classe des méthodes qu'elle ne sait pas honorer (des méthodes qui lèvent « non supporté »), et ne fais pas attendre un gros objet à une fonction qui n'utilise qu'une méthode. Des attentes réduites rendent le code plus facile à réutiliser et à tester.

📖 [Ségrégation des interfaces](principles/04-interface-segregation/README.fr.md)
</details>

### 5. Quelle différence entre inversion des dépendances et injection de dépendances ?

<details>
<summary>Réponse</summary>

L'**inversion des dépendances** est le *principe* : le code métier dépend d'abstractions, pas d'outils concrets. L'**injection de dépendances** est une *technique* pour l'appliquer : passer les dépendances de l'extérieur, en général par le constructeur. Un conteneur IoC (NestJS, Symfony…) est un *outil* qui automatise l'injection.

📖 [Inversion des dépendances](principles/05-dependency-inversion/README.fr.md)
</details>

---

## Trouve le principe violé

### 6. Quel principe cette classe viole-t-elle en premier ?

```ts
class UserService {
  register(email: string, password: string) { /* ... */ }
  generateMonthlyPdfReport() { /* ... */ }
  sendNewsletter(subject: string) { /* ... */ }
}
```

<details>
<summary>Réponse</summary>

**Responsabilité unique.** La gestion des comptes, le reporting et le marketing sont trois raisons de changer sans rapport, probablement demandées par trois équipes différentes. Chacune devrait avoir sa propre classe.

📖 [Responsabilité unique](principles/01-single-responsibility/README.fr.md)
</details>

### 7. Tu dois ajouter le transporteur « fedex ». Quel principe ce code viole-t-il, et comment le corriger ?

```js
function shippingCost(carrier, weight) {
  if (carrier === 'dhl') return 5 + weight * 1.2;
  if (carrier === 'ups') return 4 + weight * 1.5;
  throw new Error(`Unknown carrier: ${carrier}`);
}
```

<details>
<summary>Réponse</summary>

**Ouvert/fermé.** Chaque nouveau transporteur oblige à modifier cette fonction. Transforme chaque transporteur en objet avec une méthode `cost(weight)` (le pattern **Strategy**), et cherche le bon dans une table : ajouter FedEx devient une nouvelle classe et une ligne là où la table est construite.

📖 [Ouvert/fermé](principles/02-open-closed/README.fr.md)
</details>

### 8. Quel principe ce code viole-t-il ?

```php
class ReadOnlyFile extends File
{
    public function write(string $content): void
    {
        throw new LogicException('This file is read-only');
    }
}
```

<details>
<summary>Réponse</summary>

D'abord la **substitution de Liskov** : tout code qui écrit dans un `File` plante quand il reçoit un `ReadOnlyFile`. C'est aussi le signe d'un problème de **ségrégation des interfaces** : `File` mélange lecture et écriture, alors que certains fichiers ne peuvent qu'être lus.

📖 [Substitution de Liskov](principles/03-liskov-substitution/README.fr.md)
</details>

### 9. Un tableau de bord ne fait qu'afficher des rapports. Quel principe cette conception viole-t-elle ?

```ts
interface ReportRepository {
  find(id: string): Report;
  findAll(): Report[];
  save(report: Report): void;
  delete(id: string): void;
  exportToCsv(): string;
}

class Dashboard {
  constructor(private readonly reports: ReportRepository) {}
  render() { return this.reports.findAll(); }
}
```

<details>
<summary>Réponse</summary>

**Ségrégation des interfaces.** `Dashboard` n'appelle que `findAll()`, mais dépend de cinq méthodes. Un faux pour ses tests doit implémenter les cinq, et tout changement sur l'enregistrement ou l'export le concerne sans raison. Demande plutôt une petite interface `ReportReader`.

📖 [Ségrégation des interfaces](principles/04-interface-segregation/README.fr.md)
</details>

### 10. Quel principe ce code viole-t-il ?

```js
import Stripe from 'stripe';

class CheckoutService {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_KEY);
  }

  pay(order) {
    return this.stripe.charges.create({ amount: order.total });
  }
}
```

<details>
<summary>Réponse</summary>

**Inversion des dépendances.** La classe métier crée elle-même un SDK externe et dépend directement de lui et d'une variable d'environnement. Impossible de tester `pay()` sans Stripe, ni de changer de fournisseur sans la réécrire. Définis une abstraction `PaymentGateway` et passe un `StripePaymentGateway` par le constructeur.

📖 [Inversion des dépendances](principles/05-dependency-inversion/README.fr.md)
</details>

---

## Pour aller plus loin

### 11. Pourquoi `Square extends Rectangle` pose-t-il problème, alors qu'un carré *est* un rectangle en mathématiques ?

<details>
<summary>Réponse</summary>

Parce que `Rectangle` fait une promesse implicite : *modifier la hauteur ne change pas la largeur*. Pour rester carré, `Square` doit la casser. Une fonction qui fixe la largeur à 4 et la hauteur à 5 attend une aire de 20 et obtient 25 avec un carré. L'héritage, c'est tenir des promesses, pas « est un » dans le monde réel.

📖 [Substitution de Liskov](principles/03-liskov-substitution/README.fr.md)
</details>

### 12. Faire `new Order(id, email, amount)` dans une méthode métier viole-t-il le principe d'inversion des dépendances ?

<details>
<summary>Réponse</summary>

**Non.** `Order` est un objet valeur : de simples données qu'on ne voudra jamais remplacer par une autre implémentation. Le DIP concerne les dépendances qui parlent au monde extérieur (base de données, réseau, fichiers, horloge, aléatoire) ou qu'on prévoit vraiment de remplacer.

📖 [Inversion des dépendances](principles/05-dependency-inversion/README.fr.md)
</details>

### 13. Pourquoi appeler directement `new Date()` dans la logique métier relève-t-il de l'inversion des dépendances ?

<details>
<summary>Réponse</summary>

L'horloge du système est une dépendance au monde extérieur, au même titre qu'un appel réseau. Le résultat change à chaque exécution, donc une règle comme « avant midi, dire bonjour » ne peut pas être testée de façon fiable. La cacher derrière une petite interface `Clock` permet aux tests de choisir l'heure.

📖 [Exercice 5](exercises/05-dependency-inversion/README.fr.md)
</details>

### 14. Certaines implémentations d'une interface lèvent `"Not supported"` pour l'une de ses méthodes. Quels **deux** principes sont en général violés ?

<details>
<summary>Réponse</summary>

La **substitution de Liskov**, car ces implémentations ne peuvent pas remplacer l'abstraction sans risque, et la **ségrégation des interfaces**, car l'interface les oblige à avoir une méthode qu'elles ne savent pas honorer. Découper l'interface par rôle corrige en général les deux.

📖 [Ségrégation des interfaces](principles/04-interface-segregation/README.fr.md)
</details>

### 15. Pour tester que « le mot de passe doit contenir au moins 8 caractères », tu as besoin d'une base MySQL qui tourne. Qu'est-ce que ça t'apprend ?

<details>
<summary>Réponse</summary>

Probablement deux choses : la règle de validation est mélangée au stockage (**responsabilité unique**), et la classe crée elle-même sa connexion à la base au lieu de la recevoir (**inversion des dépendances**). Une règle pure doit pouvoir se tester en une ligne, sans aucune infrastructure.

📖 [Exercice 1](exercises/01-single-responsibility/README.fr.md)
</details>

---

## Ton score

| Points | Niveau |
|---|---|
| 13–15 | 🏆 C'est acquis. Essaie de repérer ces situations dans un vrai projet, ou aide quelqu'un d'autre à parcourir ce dépôt. |
| 9–12 | 👍 De bonnes bases. Relis les principes ratés et fais leurs exercices. |
| 5–8 | 📚 Bon début. Reprends les principes dans l'ordre et lance chaque démo. |
| 0–4 | 🌱 Pas d'inquiétude, tout le monde commence ici. Démarre par le [README](README.fr.md) et prends un principe par jour. |

Garde la [fiche mémo](CHEATSHEET.fr.md) sous la main pour ta prochaine revue de code.
