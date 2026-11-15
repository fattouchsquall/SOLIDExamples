package main

import (
	"fmt"

	"github.com/fattouchsquall/SOLIDExamples/principles/03-liskov-substitution/go/bad"
	"github.com/fattouchsquall/SOLIDExamples/principles/03-liskov-substitution/go/good"
)

func main() {
	fmt.Println("--- Before: Square embeds Rectangle and overrides its setters ---")
	fmt.Printf("Resize(rectangle, 4, 5) = %v (expected 20)\n", bad.Resize(bad.NewRectangle(2, 3), 4, 5))
	fmt.Printf("Resize(square, 4, 5)    = %v (expected 20!)\n", bad.Resize(bad.NewSquare(2), 4, 5))

	fmt.Println("\n--- After: Rectangle and Square are two independent Shapes ---")
	shapes := []good.Shape{good.Rectangle{Width: 4, Height: 5}, good.Square{Side: 5}}
	for _, shape := range shapes {
		fmt.Printf("%T: %v\n", shape, shape.Area())
	}
	fmt.Printf("TotalArea = %v\n", good.TotalArea(shapes))
}
