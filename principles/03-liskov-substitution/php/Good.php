<?php

declare(strict_types=1);

namespace Solid\LiskovSubstitution\Good;

interface Shape
{
    public function area(): float;
}

final class Rectangle implements Shape
{
    public function __construct(
        public readonly float $width,
        public readonly float $height,
    ) {
    }

    public function area(): float
    {
        return $this->width * $this->height;
    }
}

final class Square implements Shape
{
    public function __construct(public readonly float $side)
    {
    }

    public function area(): float
    {
        return $this->side * $this->side;
    }
}

/**
 * @param list<Shape> $shapes
 */
function totalArea(array $shapes): float
{
    return array_reduce($shapes, fn (float $sum, Shape $shape): float => $sum + $shape->area(), 0.0);
}
