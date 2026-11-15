namespace Solid.Exercises.DependencyInversion.Solution;

public interface IWeatherProvider
{
    int CurrentTemperature(string city);
}

public interface IClock
{
    DateTime Now();
}

public sealed class OpenWeatherProvider : IWeatherProvider
{
    public int CurrentTemperature(string city)
    {
        Console.WriteLine($"[HTTP] GET https://api.openweathermap.org/data/2.5/weather?q={city}");

        return 12;
    }
}

public sealed class SystemClock : IClock
{
    public DateTime Now() => DateTime.Now;
}

public sealed class WeatherReporter
{
    private readonly IWeatherProvider _weather;
    private readonly IClock _clock;

    public WeatherReporter(IWeatherProvider weather, IClock clock)
    {
        _weather = weather;
        _clock = clock;
    }

    public string Report(string city)
    {
        var hour = _clock.Now().Hour;
        var greeting = "Good evening";

        if (hour < 12)
        {
            greeting = "Good morning";
        }
        else if (hour < 18)
        {
            greeting = "Good afternoon";
        }

        var temperature = _weather.CurrentTemperature(city);
        var advice = temperature < 10 ? "Take a coat." : "Enjoy your day.";

        return $"{greeting}! It is {temperature}°C in {city}. {advice}";
    }
}
