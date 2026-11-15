<?php

declare(strict_types=1);

require_once __DIR__ . '/Bad.php';
require_once __DIR__ . '/Good.php';

use Solid\DependencyInversion\Bad\OrderService as BadOrderService;
use Solid\DependencyInversion\Good\EmailNotifier;
use Solid\DependencyInversion\Good\InMemoryOrderRepository;
use Solid\DependencyInversion\Good\MySqlOrderRepository;
use Solid\DependencyInversion\Good\OrderService;
use Solid\DependencyInversion\Good\SlackNotifier;

echo "--- Before: OrderService creates MySQL and SMTP itself ---\n";
(new BadOrderService())->placeOrder('alice@example.com', 99.9);

echo "\n--- After: OrderService receives its dependencies ---\n";
echo "Production wiring:\n";
(new OrderService(new MySqlOrderRepository(), new EmailNotifier()))->placeOrder('alice@example.com', 99.9);

echo "Another wiring, same OrderService:\n";
$repository = new InMemoryOrderRepository();
(new OrderService($repository, new SlackNotifier()))->placeOrder('alice@example.com', 99.9);
echo 'Orders kept in memory: ', count($repository->orders), "\n";
