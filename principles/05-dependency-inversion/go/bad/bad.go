package bad

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

type MySQLDatabase struct{}

func (MySQLDatabase) Insert(table string, row Order) {
	fmt.Printf("[MySQL] INSERT INTO %s VALUES ('%s', '%s', %v)\n", table, row.ID, row.CustomerEmail, row.Amount)
}

type SMTPMailer struct{}

func (SMTPMailer) Send(to, subject, body string) {
	fmt.Printf("[SMTP] To: %s | %s | %s\n", to, subject, body)
}

type OrderService struct {
	database MySQLDatabase
	mailer   SMTPMailer
}

func NewOrderService() *OrderService {
	return &OrderService{database: MySQLDatabase{}, mailer: SMTPMailer{}}
}

func (s *OrderService) PlaceOrder(customerEmail string, amount float64) (Order, error) {
	if amount <= 0 {
		return Order{}, errors.New("the amount must be positive")
	}

	bytes := make([]byte, 4)
	rand.Read(bytes)
	order := Order{ID: "ORD-" + hex.EncodeToString(bytes), CustomerEmail: customerEmail, Amount: amount}
	s.database.Insert("orders", order)
	s.mailer.Send(customerEmail, "Order confirmed", "Your order "+order.ID+" is confirmed")

	return order, nil
}
