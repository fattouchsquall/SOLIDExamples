<?php

declare(strict_types=1);

namespace Solid\DependencyInversion\Good;

use InvalidArgumentException;

final readonly class Order
{
    public function __construct(
        public string $id,
        public string $customerEmail,
        public float $amount,
    ) {
    }
}

interface OrderRepository
{
    public function save(Order $order): void;
}

interface Notifier
{
    public function notify(string $recipient, string $message): void;
}

final class OrderService
{
    public function __construct(
        private readonly OrderRepository $repository,
        private readonly Notifier $notifier,
    ) {
    }

    public function placeOrder(string $customerEmail, float $amount): Order
    {
        if ($amount <= 0) {
            throw new InvalidArgumentException('The amount must be positive');
        }

        $order = new Order('ORD-' . bin2hex(random_bytes(4)), $customerEmail, $amount);
        $this->repository->save($order);
        $this->notifier->notify($customerEmail, "Your order {$order->id} is confirmed");

        return $order;
    }
}

final class MySqlOrderRepository implements OrderRepository
{
    public function save(Order $order): void
    {
        printf("[MySQL] INSERT INTO orders VALUES ('%s', '%s', %s)\n", $order->id, $order->customerEmail, $order->amount);
    }
}

final class InMemoryOrderRepository implements OrderRepository
{
    /** @var list<Order> */
    public array $orders = [];

    public function save(Order $order): void
    {
        $this->orders[] = $order;
    }
}

final class EmailNotifier implements Notifier
{
    public function notify(string $recipient, string $message): void
    {
        printf("[SMTP] To: %s | Order confirmed | %s\n", $recipient, $message);
    }
}

final class SlackNotifier implements Notifier
{
    public function notify(string $recipient, string $message): void
    {
        printf("[Slack] @%s: %s\n", $recipient, $message);
    }
}
