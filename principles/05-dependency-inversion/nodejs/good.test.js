import assert from 'node:assert/strict';
import { beforeEach, describe, test } from 'node:test';
import { InMemoryOrderRepository, OrderService } from './good.js';

class RecordingNotifier {
  constructor() {
    this.messages = [];
  }

  notify(recipient, message) {
    this.messages.push({ recipient, message });
  }
}

describe('DIP - Node.js', () => {
  let repository;
  let notifier;
  let service;

  beforeEach(() => {
    repository = new InMemoryOrderRepository();
    notifier = new RecordingNotifier();
    service = new OrderService(repository, notifier);
  });

  test('placing an order saves it and notifies the customer, without MySQL or SMTP', () => {
    const order = service.placeOrder('alice@example.com', 99.9);

    assert.deepEqual(repository.orders, [order]);
    assert.deepEqual(notifier.messages, [
      { recipient: 'alice@example.com', message: `Your order ${order.id} is confirmed` },
    ]);
  });

  test('an invalid amount is rejected before anything is saved or sent', () => {
    assert.throws(() => service.placeOrder('alice@example.com', 0), /The amount must be positive/);
    assert.equal(repository.orders.length, 0);
    assert.equal(notifier.messages.length, 0);
  });
});
