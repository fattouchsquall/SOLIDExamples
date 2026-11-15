package exercise

import (
	"fmt"
	"time"
)

type OpenWeatherClient struct{}

func (OpenWeatherClient) CurrentTemperature(city string) int {
	fmt.Println("[HTTP] GET https://api.openweathermap.org/data/2.5/weather?q=" + city)

	return 12
}

type WeatherReporter struct {
	client OpenWeatherClient
}

func NewWeatherReporter() *WeatherReporter {
	return &WeatherReporter{client: OpenWeatherClient{}}
}

func (r *WeatherReporter) Report(city string) string {
	hour := time.Now().Hour()
	greeting := "Good evening"

	if hour < 12 {
		greeting = "Good morning"
	} else if hour < 18 {
		greeting = "Good afternoon"
	}

	temperature := r.client.CurrentTemperature(city)
	advice := "Enjoy your day."
	if temperature < 10 {
		advice = "Take a coat."
	}

	return fmt.Sprintf("%s! It is %d°C in %s. %s", greeting, temperature, city, advice)
}
