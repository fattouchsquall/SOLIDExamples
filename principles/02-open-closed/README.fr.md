# O — Principe ouvert/fermé (OCP)

> 🇬🇧 [Read in English](README.md)

> **Les entités logicielles doivent être ouvertes à l'extension, mais fermées à la modification.**
> — Bertrand Meyer

## En clair

Quand un nouveau besoin arrive, tu dois pouvoir **ajouter du code** plutôt que **modifier du code qui fonctionne déjà**.

« Fermé à la modification » ne veut pas dire qu'on ne touche plus jamais au fichier. Ça veut dire qu'ajouter une nouvelle *variante* de quelque chose (un nouveau moyen de paiement, un nouveau format d'export, un nouveau type de client…) ne doit pas t'obliger à rouvrir et retester les variantes existantes.

## Le problème

[`typescript/bad.ts`](typescript/bad.ts) calcule une remise avec un `switch` :

```ts
discountFor(customerType: CustomerType, amount: number): number {
  switch (customerType) {
    case 'regular': return 0;
    case 'premium': return amount * 0.1;
    case 'vip':     return Math.min(amount * 0.2, 50);
    default: throw new Error(`Unknown customer type: ${customerType}`);
  }
}
```

Le marketing veut maintenant une remise « employee » de 30 %. Il faut :

1. Ouvrir `DiscountCalculator`, une classe qui fonctionne et qui est utilisée partout.
2. Ajouter un `case`, et peut-être casser les autres avec une faute de frappe.
3. Retester tous les types de clients, puisqu'ils vivent tous dans la même méthode.

Et ça recommencera avec « student », « black-friday », « partner »… Le `switch` grossit sans fin, et il est souvent copié ailleurs (factures, emails, rapports), qu'il faut aussi tous mettre à jour.

## La solution

[`typescript/good.ts`](typescript/good.ts) transforme chaque `case` en une classe qui respecte le même contrat :

```ts
export interface DiscountPolicy {
  discount(amount: number): number;
}

export class PremiumDiscount implements DiscountPolicy {
  discount(amount: number): number {
    return amount * 0.1;
  }
}
```

Le calculateur ne connaît plus les règles. Il choisit la bonne politique et lui délègue le calcul :

```ts
discountFor(customerType: string, amount: number): number {
  const policy = this.policies[customerType];
  // ...
  return policy.discount(amount);
}
```

Ajouter la remise employé, c'est maintenant **une nouvelle classe**, et `good.ts` n'est pas touché du tout. La [démo](typescript/demo.ts) et les [tests](typescript/good.test.ts) font exactement ça :

```ts
class EmployeeDiscount implements DiscountPolicy {
  discount(amount: number): number {
    return amount * 0.3;
  }
}

const calculator = new DiscountCalculator({
  regular: new RegularDiscount(),
  premium: new PremiumDiscount(),
  vip: new VipDiscount(),
  employee: new EmployeeDiscount(),
});
```

C'est le design pattern **Strategy**, la façon la plus courante d'appliquer l'OCP.

### Et en JavaScript ?

Le JavaScript pur n'a pas de mot-clé `interface`. Dans [`nodejs/good.js`](nodejs/good.js), le contrat est implicite : n'importe quel objet qui a une méthode `discount(amount)` convient. C'est ce qu'on appelle le *duck typing* (« si ça marche comme un canard et que ça cancane comme un canard… »). Le principe est le même, simplement le compilateur ne le vérifie plus pour toi.

## Lancer l'exemple

```bash
node principles/02-open-closed/typescript/demo.ts
node principles/02-open-closed/nodejs/demo.js
php principles/02-open-closed/php/demo.php
```

## Signaux d'alerte

- Un `switch`, un `match` ou une suite de `if/else if` sur un **type** (`type`, `kind`, `status`, `provider`…).
- Le même `switch` apparaît dans plusieurs fichiers.
- Chaque nouvelle demande commence par « ouvre cette classe et ajoute un cas ».
- Corriger un bug sur une variante en a cassé une autre.

## Ne pas en faire trop

Impossible de rendre le code ouvert à *tous* les changements possibles, et essayer crée des couches d'abstraction dont personne n'a besoin.

Un `switch` de trois cas stables qui ne bougent jamais, c'est très bien. Introduis une abstraction **la deuxième ou troisième fois** qu'une nouvelle variante apparaît, quand tu sais quelle partie varie vraiment.

## Pour aller plus loin

- 🏋️ Exercice : [`exercises/02-open-closed`](../../exercises/02-open-closed/README.fr.md)
- ⬅️ Principe précédent : [Principe de responsabilité unique](../01-single-responsibility/README.fr.md)
- ➡️ Principe suivant : [Principe de substitution de Liskov](../03-liskov-substitution/README.fr.md)
