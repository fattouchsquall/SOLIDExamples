from abc import ABC, abstractmethod
from datetime import datetime


class WeatherProvider(ABC):
    @abstractmethod
    def current_temperature(self, city: str) -> int: ...


class Clock(ABC):
    @abstractmethod
    def now(self) -> datetime: ...


class OpenWeatherProvider(WeatherProvider):
    def current_temperature(self, city: str) -> int:
        print(f"[HTTP] GET https://api.openweathermap.org/data/2.5/weather?q={city}")

        return 12


class SystemClock(Clock):
    def now(self) -> datetime:
        return datetime.now()


class WeatherReporter:
    def __init__(self, weather: WeatherProvider, clock: Clock) -> None:
        self.weather = weather
        self.clock = clock

    def report(self, city: str) -> str:
        hour = self.clock.now().hour
        greeting = "Good evening"

        if hour < 12:
            greeting = "Good morning"
        elif hour < 18:
            greeting = "Good afternoon"

        temperature = self.weather.current_temperature(city)
        advice = "Take a coat." if temperature < 10 else "Enjoy your day."

        return f"{greeting}! It is {temperature}°C in {city}. {advice}"
