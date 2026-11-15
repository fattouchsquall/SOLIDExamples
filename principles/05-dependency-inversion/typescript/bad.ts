import { randomUUID } from 'node:crypto';

export type Order = { id: string; customerEmail: string; amount: number };

export class MySqlDatabase {
  insert(table: string, row: Order): void {
    console.log(`[MySQL] INSERT INTO ${table} VALUES ('${row.id}', '${row.customerEmail}', ${row.amount})`);
  }
}

export class SmtpMailer {
  send(to: string, subject: string, body: string): void {
    console.log(`[SMTP] To: ${to} | ${subject} | ${body}`);
  }
}

export class OrderService {
  readonly database = new MySqlDatabase();
  readonly mailer = new SmtpMailer();

  placeOrder(customerEmail: string, amount: number): Order {
    if (amount <= 0) {
      throw new Error('The amount must be positive');
    }

    const order = { id: `ORD-${randomUUID().slice(0, 8)}`, customerEmail, amount };
    this.database.insert('orders', order);
    this.mailer.send(customerEmail, 'Order confirmed', `Your order ${order.id} is confirmed`);

    return order;
  }
}
