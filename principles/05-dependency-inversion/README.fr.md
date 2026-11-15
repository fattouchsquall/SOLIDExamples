# D — Principe d'inversion des dépendances (DIP)

> 🇬🇧 [Read in English](README.md)

> **Les modules de haut niveau ne doivent pas dépendre des modules de bas niveau. Les deux doivent dépendre d'abstractions.**
> **Les abstractions ne doivent pas dépendre des détails. Les détails doivent dépendre des abstractions.**
> — Robert C. Martin

## En clair

Ta **logique métier** (passer une commande, calculer un prix…) ne devrait pas savoir **quels outils** sont utilisés en dessous (MySQL, SMTP, Stripe, S3…).

Elle doit décrire ce dont elle a besoin (« quelque chose qui sait enregistrer une commande », « quelque chose qui sait prévenir un client »), et recevoir les outils concrets de l'extérieur.

## Le problème

Dans [`typescript/bad.ts`](typescript/bad.ts), `OrderService` crée lui-même ses outils :

```ts
export class OrderService {
  readonly database = new MySqlDatabase();
  readonly mailer = new SmtpMailer();

  placeOrder(customerEmail: string, amount: number): Order {
    // validation, puis :
    this.database.insert('orders', order);
    this.mailer.send(customerEmail, 'Order confirmed', `Your order ${order.id} is confirmed`);
  }
}
```

Toutes les flèches pointent **vers le bas**, de la règle métier vers les détails techniques :

```
OrderService ──► MySqlDatabase
             └─► SmtpMailer
```

Conséquences :

- **Impossible à tester isolément** : chaque test de `placeOrder()` touche MySQL et envoie un vrai email. Tester la règle « le montant doit être positif » demande une base de données.
- **Impossible de changer d'outil** : passer à PostgreSQL, ou prévenir sur Slack au lieu de l'email, oblige à réécrire `OrderService`, alors que la règle métier n'a pas changé.
- **Des dépendances cachées** : le constructeur ne dit pas ce dont la classe a besoin pour fonctionner.

> Dans les exemples, MySQL et SMTP sont simulés avec des `console.log` pour que tout se lance sans rien installer.

## La solution

[`typescript/good.ts`](typescript/good.ts) définit ce dont le métier a besoin, sous forme d'interfaces **qui appartiennent au métier** :

```ts
export interface OrderRepository {
  save(order: Order): void;
}

export interface Notifier {
  notify(recipient: string, message: string): void;
}
```

`OrderService` ne dépend que de ces abstractions, et reçoit les implémentations concrètes par son constructeur :

```ts
export class OrderService {
  constructor(repository: OrderRepository, notifier: Notifier) { /* ... */ }
}
```

Les classes techniques implémentent les abstractions. Les flèches pointent maintenant **vers** les abstractions, d'où le mot *inversion* :

```
OrderService ──► OrderRepository ◄── MySqlOrderRepository, InMemoryOrderRepository
             └─► Notifier        ◄── EmailNotifier, SlackNotifier
```

Le choix des outils se fait à un seul endroit, au bord de l'application (ici, la [démo](typescript/demo.ts)) :

```ts
new OrderService(new MySqlOrderRepository(), new EmailNotifier());   // production
new OrderService(new InMemoryOrderRepository(), new SlackNotifier()); // autre assemblage
```

Et les [tests](typescript/good.test.ts) utilisent un dépôt en mémoire et un notifieur qui enregistre les messages : rapide, sans base de données, sans email.

### DIP, injection de dépendances, conteneur IoC : quelle différence ?

- L'**inversion des dépendances** est le *principe* : dépendre d'abstractions.
- L'**injection de dépendances** est une *technique* pour l'appliquer : passer les dépendances de l'extérieur, en général par le constructeur. C'est tout ce que fait cet exemple.
- Un **conteneur IoC** (NestJS, Symfony, Spring…) est un *outil* qui fait l'injection automatiquement. Utile dans les grosses applications, mais pas nécessaire pour appliquer le DIP.

## Lancer l'exemple

```bash
node principles/05-dependency-inversion/typescript/demo.ts
node principles/05-dependency-inversion/nodejs/demo.js
php principles/05-dependency-inversion/php/demo.php
```

## Signaux d'alerte

- Un `new` d'une classe technique (base de données, client HTTP, mailer, SDK) au milieu de la logique métier.
- Le code métier importe directement une librairie externe (`mysql2`, `nodemailer`, `aws-sdk`, `PDO`…).
- Les tests ont besoin d'une base de données qui tourne, d'une connexion réseau ou de mocks de modules globaux.
- Changer de fournisseur oblige à modifier des classes qui contiennent des règles métier.

## Ne pas en faire trop

Tous les `new` ne posent pas problème. Créer un objet valeur (`new Order(...)`, `new Date()`, un tableau), c'est normal : ce ne sont pas des dépendances qu'on voudra remplacer.

Introduis une abstraction pour ce qui **parle au monde extérieur** (base de données, réseau, fichiers, horloge, aléatoire) ou que tu prévois vraiment de remplacer.

## Pour aller plus loin

- 🏋️ Exercice : [`exercises/05-dependency-inversion`](../../exercises/05-dependency-inversion/README.fr.md)
- ⬅️ Principe précédent : [Principe de ségrégation des interfaces](../04-interface-segregation/README.fr.md)
- 🏁 Retour au [sommaire](../../README.fr.md), puis teste-toi avec le [quiz](../../QUIZ.fr.md)
