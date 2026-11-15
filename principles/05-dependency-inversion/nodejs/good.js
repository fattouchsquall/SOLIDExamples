import { randomUUID } from 'node:crypto';

export class OrderService {
  constructor(repository, notifier) {
    this.repository = repository;
    this.notifier = notifier;
  }

  placeOrder(customerEmail, amount) {
    if (amount <= 0) {
      throw new Error('The amount must be positive');
    }

    const order = { id: `ORD-${randomUUID().slice(0, 8)}`, customerEmail, amount };
    this.repository.save(order);
    this.notifier.notify(customerEmail, `Your order ${order.id} is confirmed`);

    return order;
  }
}

export class MySqlOrderRepository {
  save(order) {
    console.log(`[MySQL] INSERT INTO orders VALUES ('${order.id}', '${order.customerEmail}', ${order.amount})`);
  }
}

export class InMemoryOrderRepository {
  constructor() {
    this.orders = [];
  }

  save(order) {
    this.orders.push(order);
  }
}

export class EmailNotifier {
  notify(recipient, message) {
    console.log(`[SMTP] To: ${recipient} | Order confirmed | ${message}`);
  }
}

export class SlackNotifier {
  notify(recipient, message) {
    console.log(`[Slack] @${recipient}: ${message}`);
  }
}
