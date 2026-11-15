from datetime import datetime


class OpenWeatherClient:
    def current_temperature(self, city: str) -> int:
        print(f"[HTTP] GET https://api.openweathermap.org/data/2.5/weather?q={city}")

        return 12


class WeatherReporter:
    def __init__(self) -> None:
        self.client = OpenWeatherClient()

    def report(self, city: str) -> str:
        hour = datetime.now().hour
        greeting = "Good evening"

        if hour < 12:
            greeting = "Good morning"
        elif hour < 18:
            greeting = "Good afternoon"

        temperature = self.client.current_temperature(city)
        advice = "Take a coat." if temperature < 10 else "Enjoy your day."

        return f"{greeting}! It is {temperature}°C in {city}. {advice}"
