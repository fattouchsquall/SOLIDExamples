import assert from 'node:assert/strict';
import { beforeEach, describe, test } from 'node:test';
import { InMemoryOrderRepository, type Notifier, OrderService } from './good.ts';

class RecordingNotifier implements Notifier {
  readonly messages: { recipient: string; message: string }[] = [];

  notify(recipient: string, message: string): void {
    this.messages.push({ recipient, message });
  }
}

describe('DIP - TypeScript', () => {
  let repository: InMemoryOrderRepository;
  let notifier: RecordingNotifier;
  let service: OrderService;

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
