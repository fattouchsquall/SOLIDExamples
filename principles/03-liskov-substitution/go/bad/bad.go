package bad

type Resizable interface {
	SetWidth(width float64)
	SetHeight(height float64)
	Area() float64
}

type Rectangle struct {
	width  float64
	height float64
}

func NewRectangle(width, height float64) *Rectangle {
	return &Rectangle{width: width, height: height}
}

func (r *Rectangle) SetWidth(width float64) {
	r.width = width
}

func (r *Rectangle) SetHeight(height float64) {
	r.height = height
}

func (r *Rectangle) Area() float64 {
	return r.width * r.height
}

type Square struct {
	Rectangle
}

func NewSquare(side float64) *Square {
	return &Square{Rectangle{width: side, height: side}}
}

func (s *Square) SetWidth(width float64) {
	s.width = width
	s.height = width
}

func (s *Square) SetHeight(height float64) {
	s.width = height
	s.height = height
}

func Resize(shape Resizable, width, height float64) float64 {
	shape.SetWidth(width)
	shape.SetHeight(height)

	return shape.Area()
}
