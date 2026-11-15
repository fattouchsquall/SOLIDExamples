export class OpenWeatherProvider {
  currentTemperature(city) {
    console.log(`[HTTP] GET https://api.openweathermap.org/data/2.5/weather?q=${city}`);

    return 12;
  }
}

export class SystemClock {
  now() {
    return new Date();
  }
}

export class WeatherReporter {
  constructor(weather, clock) {
    this.weather = weather;
    this.clock = clock;
  }

  report(city) {
    const hour = this.clock.now().getHours();
    let greeting = 'Good evening';

    if (hour < 12) {
      greeting = 'Good morning';
    } else if (hour < 18) {
      greeting = 'Good afternoon';
    }

    const temperature = this.weather.currentTemperature(city);
    const advice = temperature < 10 ? 'Take a coat.' : 'Enjoy your day.';

    return `${greeting}! It is ${temperature}°C in ${city}. ${advice}`;
  }
}
