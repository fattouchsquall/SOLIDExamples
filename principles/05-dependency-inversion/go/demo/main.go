package main

import (
	"fmt"

	"github.com/fattouchsquall/SOLIDExamples/principles/05-dependency-inversion/go/bad"
	"github.com/fattouchsquall/SOLIDExamples/principles/05-dependency-inversion/go/good"
)

func main() {
	fmt.Println("--- Before: OrderService creates MySQL and SMTP itself ---")
	if _, err := bad.NewOrderService().PlaceOrder("alice@example.com", 99.9); err != nil {
		panic(err)
	}

	fmt.Println("\n--- After: OrderService receives its dependencies ---")
	fmt.Println("Production wiring:")
	production := good.NewOrderService(good.MySQLOrderRepository{}, good.EmailNotifier{})
	if _, err := production.PlaceOrder("alice@example.com", 99.9); err != nil {
		panic(err)
	}

	fmt.Println("Another wiring, same OrderService:")
	repository := &good.InMemoryOrderRepository{}
	another := good.NewOrderService(repository, good.SlackNotifier{})
	if _, err := another.PlaceOrder("alice@example.com", 99.9); err != nil {
		panic(err)
	}
	fmt.Printf("Orders kept in memory: %d\n", len(repository.Orders))
}
