namespace Solid.Exercises.DependencyInversion.Exercise;

public sealed class OpenWeatherClient
{
    public int CurrentTemperature(string city)
    {
        Console.WriteLine($"[HTTP] GET https://api.openweathermap.org/data/2.5/weather?q={city}");

        return 12;
    }
}

public sealed class WeatherReporter
{
    private readonly OpenWeatherClient _client = new();

    public string Report(string city)
    {
        var hour = DateTime.Now.Hour;
        var greeting = "Good evening";

        if (hour < 12)
        {
            greeting = "Good morning";
        }
        else if (hour < 18)
        {
            greeting = "Good afternoon";
        }

        var temperature = _client.CurrentTemperature(city);
        var advice = temperature < 10 ? "Take a coat." : "Enjoy your day.";

        return $"{greeting}! It is {temperature}°C in {city}. {advice}";
    }
}
