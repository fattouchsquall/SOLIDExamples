<?php

declare(strict_types=1);

namespace Solid\Exercises\DependencyInversion\Solution;

use DateTimeImmutable;

interface WeatherProvider
{
    public function currentTemperature(string $city): int;
}

interface Clock
{
    public function now(): DateTimeImmutable;
}

final class OpenWeatherProvider implements WeatherProvider
{
    public function currentTemperature(string $city): int
    {
        echo "[HTTP] GET https://api.openweathermap.org/data/2.5/weather?q={$city}\n";

        return 12;
    }
}

final class SystemClock implements Clock
{
    public function now(): DateTimeImmutable
    {
        return new DateTimeImmutable();
    }
}

final class WeatherReporter
{
    public function __construct(
        private readonly WeatherProvider $weather,
        private readonly Clock $clock,
    ) {
    }

    public function report(string $city): string
    {
        $hour = (int) $this->clock->now()->format('G');
        $greeting = 'Good evening';

        if ($hour < 12) {
            $greeting = 'Good morning';
        } elseif ($hour < 18) {
            $greeting = 'Good afternoon';
        }

        $temperature = $this->weather->currentTemperature($city);
        $advice = $temperature < 10 ? 'Take a coat.' : 'Enjoy your day.';

        return "{$greeting}! It is {$temperature}°C in {$city}. {$advice}";
    }
}
