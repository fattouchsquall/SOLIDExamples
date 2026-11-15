import java.time.LocalDateTime;

public final class Solution {
    private Solution() {
    }

    public interface WeatherProvider {
        int currentTemperature(String city);
    }

    public interface Clock {
        LocalDateTime now();
    }

    public static final class OpenWeatherProvider implements WeatherProvider {
        @Override
        public int currentTemperature(String city) {
            System.out.println("[HTTP] GET https://api.openweathermap.org/data/2.5/weather?q=" + city);

            return 12;
        }
    }

    public static final class SystemClock implements Clock {
        @Override
        public LocalDateTime now() {
            return LocalDateTime.now();
        }
    }

    public static final class WeatherReporter {
        private final WeatherProvider weather;
        private final Clock clock;

        public WeatherReporter(WeatherProvider weather, Clock clock) {
            this.weather = weather;
            this.clock = clock;
        }

        public String report(String city) {
            int hour = clock.now().getHour();
            String greeting = "Good evening";

            if (hour < 12) {
                greeting = "Good morning";
            } else if (hour < 18) {
                greeting = "Good afternoon";
            }

            int temperature = weather.currentTemperature(city);
            String advice = temperature < 10 ? "Take a coat." : "Enjoy your day.";

            return greeting + "! It is " + temperature + "°C in " + city + ". " + advice;
        }
    }
}
