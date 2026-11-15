package good

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
)

type Order struct {
	ID            string
	CustomerEmail string
	Amount        float64
}

type OrderRepository interface {
	Save(order Order)
}

type Notifier interface {
	Notify(recipient, message string)
}

type OrderService struct {
	repository OrderRepository
	notifier   Notifier
}

func NewOrderService(repository OrderRepository, notifier Notifier) *OrderService {
	return &OrderService{repository: repository, notifier: notifier}
}

func (s *OrderService) PlaceOrder(customerEmail string, amount float64) (Order, error) {
	if amount <= 0 {
		return Order{}, errors.New("the amount must be positive")
	}

	bytes := make([]byte, 4)
	rand.Read(bytes)
	order := Order{ID: "ORD-" + hex.EncodeToString(bytes), CustomerEmail: customerEmail, Amount: amount}
	s.repository.Save(order)
	s.notifier.Notify(customerEmail, "Your order "+order.ID+" is confirmed")

	return order, nil
}

type MySQLOrderRepository struct{}

func (MySQLOrderRepository) Save(order Order) {
	fmt.Printf("[MySQL] INSERT INTO orders VALUES ('%s', '%s', %v)\n", order.ID, order.CustomerEmail, order.Amount)
}

type InMemoryOrderRepository struct {
	Orders []Order
}

func (r *InMemoryOrderRepository) Save(order Order) {
	r.Orders = append(r.Orders, order)
}

type EmailNotifier struct{}

func (EmailNotifier) Notify(recipient, message string) {
	fmt.Printf("[SMTP] To: %s | Order confirmed | %s\n", recipient, message)
}

type SlackNotifier struct{}

func (SlackNotifier) Notify(recipient, message string) {
	fmt.Printf("[Slack] @%s: %s\n", recipient, message)
}
