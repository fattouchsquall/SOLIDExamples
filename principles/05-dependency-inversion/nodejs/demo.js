import { OrderService as BadOrderService } from './bad.js';
import {
  EmailNotifier,
  InMemoryOrderRepository,
  MySqlOrderRepository,
  OrderService,
  SlackNotifier,
} from './good.js';

console.log('--- Before: OrderService creates MySQL and SMTP itself ---');
new BadOrderService().placeOrder('alice@example.com', 99.9);

console.log('\n--- After: OrderService receives its dependencies ---');
console.log('Production wiring:');
new OrderService(new MySqlOrderRepository(), new EmailNotifier()).placeOrder('alice@example.com', 99.9);

console.log('Another wiring, same OrderService:');
const repository = new InMemoryOrderRepository();
new OrderService(repository, new SlackNotifier()).placeOrder('alice@example.com', 99.9);
console.log(`Orders kept in memory: ${repository.orders.length}`);
