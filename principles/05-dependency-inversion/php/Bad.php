<?php

declare(strict_types=1);

namespace Solid\DependencyInversion\Bad;

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

final class MySqlDatabase
{
    public function insert(string $table, Order $row): void
    {
        printf("[MySQL] INSERT INTO %s VALUES ('%s', '%s', %s)\n", $table, $row->id, $row->customerEmail, $row->amount);
    }
}

final class SmtpMailer
{
    public function send(string $to, string $subject, string $body): void
    {
        printf("[SMTP] To: %s | %s | %s\n", $to, $subject, $body);
    }
}

final class OrderService
{
    private MySqlDatabase $database;

    private SmtpMailer $mailer;

    public function __construct()
    {
        $this->database = new MySqlDatabase();
        $this->mailer = new SmtpMailer();
    }

    public function placeOrder(string $customerEmail, float $amount): Order
    {
        if ($amount <= 0) {
            throw new InvalidArgumentException('The amount must be positive');
        }

        $order = new Order('ORD-' . bin2hex(random_bytes(4)), $customerEmail, $amount);
        $this->database->insert('orders', $order);
        $this->mailer->send($customerEmail, 'Order confirmed', "Your order {$order->id} is confirmed");

        return $order;
    }
}
