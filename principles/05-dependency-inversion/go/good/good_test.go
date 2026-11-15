package good_test

import (
	"slices"
	"testing"

	"github.com/fattouchsquall/SOLIDExamples/principles/05-dependency-inversion/go/good"
)

type recordingNotifier struct {
	messages []string
}

func (n *recordingNotifier) Notify(recipient, message string) {
	n.messages = append(n.messages, recipient+" | "+message)
}

func TestPlacingAnOrderSavesItAndNotifiesTheCustomerWithoutMySQLOrSMTP(t *testing.T) {
	repository := &good.InMemoryOrderRepository{}
	notifier := &recordingNotifier{}
	service := good.NewOrderService(repository, notifier)

	order, err := service.PlaceOrder("alice@example.com", 99.9)
	if err != nil {
		t.Fatal(err)
	}

	if !slices.Equal(repository.Orders, []good.Order{order}) {
		t.Errorf("Orders = %v, want [%v]", repository.Orders, order)
	}
	want := []string{"alice@example.com | Your order " + order.ID + " is confirmed"}
	if !slices.Equal(notifier.messages, want) {
		t.Errorf("messages = %v, want %v", notifier.messages, want)
	}
}

func TestAnInvalidAmountIsRejectedBeforeAnythingIsSavedOrSent(t *testing.T) {
	repository := &good.InMemoryOrderRepository{}
	notifier := &recordingNotifier{}
	service := good.NewOrderService(repository, notifier)

	_, err := service.PlaceOrder("alice@example.com", 0)

	if err == nil || err.Error() != "the amount must be positive" {
		t.Errorf("PlaceOrder() error = %v, want the amount must be positive", err)
	}
	if len(repository.Orders) != 0 || len(notifier.messages) != 0 {
		t.Error("nothing should be saved or sent")
	}
}
