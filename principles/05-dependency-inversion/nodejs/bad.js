import { randomUUID } from 'node:crypto';

export class MySqlDatabase {
  insert(table, row) {
    console.log(`[MySQL] INSERT INTO ${table} VALUES ('${row.id}', '${row.customerEmail}', ${row.amount})`);
  }
}

export class SmtpMailer {
  send(to, subject, body) {
    console.log(`[SMTP] To: ${to} | ${subject} | ${body}`);
  }
}

export class OrderService {
  constructor() {
    this.database = new MySqlDatabase();
    this.mailer = new SmtpMailer();
  }

  placeOrder(customerEmail, amount) {
    if (amount <= 0) {
      throw new Error('The amount must be positive');
    }

    const order = { id: `ORD-${randomUUID().slice(0, 8)}`, customerEmail, amount };
    this.database.insert('orders', order);
    this.mailer.send(customerEmail, 'Order confirmed', `Your order ${order.id} is confirmed`);

    return order;
  }
}
