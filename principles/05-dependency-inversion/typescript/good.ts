import { randomUUID } from 'node:crypto';

export type Order = { id: string; customerEmail: string; amount: number };

export interface OrderRepository {
  save(order: Order): void;
}

export interface Notifier {
  notify(recipient: string, message: string): void;
}

export class OrderService {
  readonly repository: OrderRepository;
  readonly notifier: Notifier;

  constructor(repository: OrderRepository, notifier: Notifier) {
    this.repository = repository;
    this.notifier = notifier;
  }

  placeOrder(customerEmail: string, amount: number): Order {
    if (amount <= 0) {
      throw new Error('The amount must be positive');
    }

    const order = { id: `ORD-${randomUUID().slice(0, 8)}`, customerEmail, amount };
    this.repository.save(order);
    this.notifier.notify(customerEmail, `Your order ${order.id} is confirmed`);

    return order;
  }
}

export class MySqlOrderRepository implements OrderRepository {
  save(order: Order): void {
    console.log(`[MySQL] INSERT INTO orders VALUES ('${order.id}', '${order.customerEmail}', ${order.amount})`);
  }
}

export class InMemoryOrderRepository implements OrderRepository {
  readonly orders: Order[] = [];

  save(order: Order): void {
    this.orders.push(order);
  }
}

export class EmailNotifier implements Notifier {
  notify(recipient: string, message: string): void {
    console.log(`[SMTP] To: ${recipient} | Order confirmed | ${message}`);
  }
}

export class SlackNotifier implements Notifier {
  notify(recipient: string, message: string): void {
    console.log(`[Slack] @${recipient}: ${message}`);
  }
}
