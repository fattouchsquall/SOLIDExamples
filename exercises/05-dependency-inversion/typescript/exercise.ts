export class OpenWeatherClient {
  currentTemperature(city: string): number {
    console.log(`[HTTP] GET https://api.openweathermap.org/data/2.5/weather?q=${city}`);

    return 12;
  }
}

export class WeatherReporter {
  readonly client = new OpenWeatherClient();

  report(city: string): string {
    const hour = new Date().getHours();
    let greeting = 'Good evening';

    if (hour < 12) {
      greeting = 'Good morning';
    } else if (hour < 18) {
      greeting = 'Good afternoon';
    }

    const temperature = this.client.currentTemperature(city);
    const advice = temperature < 10 ? 'Take a coat.' : 'Enjoy your day.';

    return `${greeting}! It is ${temperature}°C in ${city}. ${advice}`;
  }
}
