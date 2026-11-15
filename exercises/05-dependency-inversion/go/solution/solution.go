package solution

import (
	"fmt"
	"time"
)

type WeatherProvider interface {
	CurrentTemperature(city string) int
}

type Clock interface {
	Now() time.Time
}

type OpenWeatherProvider struct{}

func (OpenWeatherProvider) CurrentTemperature(city string) int {
	fmt.Println("[HTTP] GET https://api.openweathermap.org/data/2.5/weather?q=" + city)

	return 12
}

type SystemClock struct{}

func (SystemClock) Now() time.Time {
	return time.Now()
}

type WeatherReporter struct {
	weather WeatherProvider
	clock   Clock
}

func NewWeatherReporter(weather WeatherProvider, clock Clock) *WeatherReporter {
	return &WeatherReporter{weather: weather, clock: clock}
}

func (r *WeatherReporter) Report(city string) string {
	hour := r.clock.Now().Hour()
	greeting := "Good evening"

	if hour < 12 {
		greeting = "Good morning"
	} else if hour < 18 {
		greeting = "Good afternoon"
	}

	temperature := r.weather.CurrentTemperature(city)
	advice := "Enjoy your day."
	if temperature < 10 {
		advice = "Take a coat."
	}

	return fmt.Sprintf("%s! It is %d°C in %s. %s", greeting, temperature, city, advice)
}
