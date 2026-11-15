<?php

declare(strict_types=1);

namespace Solid\LiskovSubstitution\Bad;

class Rectangle
{
    public function __construct(
        protected float $width,
        protected float $height,
    ) {
    }

    public function setWidth(float $width): void
    {
        $this->width = $width;
    }

    public function setHeight(float $height): void
    {
        $this->height = $height;
    }

    public function area(): float
    {
        return $this->width * $this->height;
    }
}

final class Square extends Rectangle
{
    public function __construct(float $side)
    {
        parent::__construct($side, $side);
    }

    public function setWidth(float $width): void
    {
        $this->width = $width;
        $this->height = $width;
    }

    public function setHeight(float $height): void
    {
        $this->width = $height;
        $this->height = $height;
    }
}

function resize(Rectangle $rectangle, float $width, float $height): float
{
    $rectangle->setWidth($width);
    $rectangle->setHeight($height);

    return $rectangle->area();
}
