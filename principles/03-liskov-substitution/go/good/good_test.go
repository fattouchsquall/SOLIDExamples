package good_test

import (
	"testing"

	"github.com/fattouchsquall/SOLIDExamples/principles/03-liskov-substitution/go/good"
)

type triangle struct {
	base   float64
	height float64
}

func (t triangle) Area() float64 {
	return t.base * t.height / 2
}

func TestEachShapeComputesItsOwnArea(t *testing.T) {
	if got := (good.Rectangle{Width: 4, Height: 5}).Area(); got != 20 {
		t.Errorf("Rectangle.Area() = %v, want 20", got)
	}
	if got := (good.Square{Side: 5}).Area(); got != 25 {
		t.Errorf("Square.Area() = %v, want 25", got)
	}
}

func TestTotalAreaWorksWithAnyShape(t *testing.T) {
	shapes := []good.Shape{good.Rectangle{Width: 4, Height: 5}, good.Square{Side: 5}}

	if got := good.TotalArea(shapes); got != 45 {
		t.Errorf("TotalArea() = %v, want 45", got)
	}
}

func TestANewShapeCanBeSubstitutedWithoutChangingTotalArea(t *testing.T) {
	shapes := []good.Shape{good.Square{Side: 2}, triangle{base: 4, height: 3}}

	if got := good.TotalArea(shapes); got != 10 {
		t.Errorf("TotalArea() = %v, want 10", got)
	}
}
