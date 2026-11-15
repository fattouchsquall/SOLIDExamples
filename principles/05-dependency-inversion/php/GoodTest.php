<?php

declare(strict_types=1);

namespace Solid\DependencyInversion\Tests;

require_once __DIR__ . '/Good.php';

use InvalidArgumentException;
use PHPUnit\Framework\TestCase;
use Solid\DependencyInversion\Good\InMemoryOrderRepository;
use Solid\DependencyInversion\Good\Notifier;
use Solid\DependencyInversion\Good\OrderService;

final class RecordingNotifier implements Notifier
{
    /** @var list<array{recipient: string, message: string}> */
    public array $messages = [];

    public function notify(string $recipient, string $message): void
    {
        $this->messages[] = ['recipient' => $recipient, 'message' => $message];
    }
}

final class GoodTest extends TestCase
{
    private InMemoryOrderRepository $repository;

    private RecordingNotifier $notifier;

    private OrderService $service;

    protected function setUp(): void
    {
        $this->repository = new InMemoryOrderRepository();
        $this->notifier = new RecordingNotifier();
        $this->service = new OrderService($this->repository, $this->notifier);
    }

    public function testPlacingAnOrderSavesItAndNotifiesTheCustomerWithoutMySqlOrSmtp(): void
    {
        $order = $this->service->placeOrder('alice@example.com', 99.9);

        self::assertSame([$order], $this->repository->orders);
        self::assertSame(
            [['recipient' => 'alice@example.com', 'message' => "Your order {$order->id} is confirmed"]],
            $this->notifier->messages,
        );
    }

    public function testAnInvalidAmountIsRejectedBeforeAnythingIsSavedOrSent(): void
    {
        try {
            $this->service->placeOrder('alice@example.com', 0);
            self::fail('An exception was expected');
        } catch (InvalidArgumentException $exception) {
            self::assertSame('The amount must be positive', $exception->getMessage());
        }

        self::assertSame([], $this->repository->orders);
        self::assertSame([], $this->notifier->messages);
    }
}
