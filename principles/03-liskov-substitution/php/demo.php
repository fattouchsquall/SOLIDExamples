<?php

declare(strict_types=1);

require_once __DIR__ . '/Bad.php';
require_once __DIR__ . '/Good.php';

use Solid\LiskovSubstitution\Bad\Rectangle as BadRectangle;
use Solid\LiskovSubstitution\Bad\Square as BadSquare;
use Solid\LiskovSubstitution\Good\Rectangle;
use Solid\LiskovSubstitution\Good\Square;

use function Solid\LiskovSubstitution\Bad\resize;
use function Solid\LiskovSubstitution\Good\totalArea;

echo "--- Before: Square extends Rectangle ---\n";
echo 'resize(rectangle, 4, 5) = ', resize(new BadRectangle(2, 3), 4, 5), " (expected 20)\n";
echo 'resize(square, 4, 5)    = ', resize(new BadSquare(2), 4, 5), " (expected 20!)\n";

echo "\n--- After: Rectangle and Square are two independent Shapes ---\n";
$shapes = [new Rectangle(4, 5), new Square(5)];
foreach ($shapes as $shape) {
    echo (new ReflectionClass($shape))->getShortName(), ': ', $shape->area(), "\n";
}
echo 'totalArea = ', totalArea($shapes), "\n";
