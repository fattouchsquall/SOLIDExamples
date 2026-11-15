import java.time.LocalDateTime;

public final class Exercise {
    private Exercise() {
    }

    public static final class OpenWeatherClient {
        public int currentTemperature(String city) {
            System.out.println("[HTTP] GET https://api.openweathermap.org/data/2.5/weather?q=" + city);

            return 12;
        }
    }

    public static final class WeatherReporter {
        private final OpenWeatherClient client = new OpenWeatherClient();

        public String report(String city) {
            int hour = LocalDateTime.now().getHour();
            String greeting = "Good evening";

            if (hour < 12) {
                greeting = "Good morning";
            } else if (hour < 18) {
                greeting = "Good afternoon";
            }

            int temperature = client.currentTemperature(city);
            String advice = temperature < 10 ? "Take a coat." : "Enjoy your day.";

            return greeting + "! It is " + temperature + "°C in " + city + ". " + advice;
        }
    }
}
