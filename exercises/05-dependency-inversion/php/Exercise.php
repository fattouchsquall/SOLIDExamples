<?php

declare(strict_types=1);

namespace Solid\Exercises\DependencyInversion\Exercise;

use DateTimeImmutable;

final class OpenWeatherClient
{
    public function currentTemperature(string $city): int
    {
        echo "[HTTP] GET https://api.openweathermap.org/data/2.5/weather?q={$city}\n";

        return 12;
    }
}

final class WeatherReporter
{
    private OpenWeatherClient $client;

    public function __construct()
    {
        $this->client = new OpenWeatherClient();
    }

    public function report(string $city): string
    {
        $hour = (int) (new DateTimeImmutable())->format('G');
        $greeting = 'Good evening';

        if ($hour < 12) {
            $greeting = 'Good morning';
        } elseif ($hour < 18) {
            $greeting = 'Good afternoon';
        }

        $temperature = $this->client->currentTemperature($city);
        $advice = $temperature < 10 ? 'Take a coat.' : 'Enjoy your day.';

        return "{$greeting}! It is {$temperature}°C in {$city}. {$advice}";
    }
}
