public final class Bad {
    private Bad() {
    }

    public static class Rectangle {
        protected double width;
        protected double height;

        public Rectangle(double width, double height) {
            this.width = width;
            this.height = height;
        }

        public void setWidth(double width) {
            this.width = width;
        }

        public void setHeight(double height) {
            this.height = height;
        }

        public double area() {
            return width * height;
        }
    }

    public static final class Square extends Rectangle {
        public Square(double side) {
            super(side, side);
        }

        @Override
        public void setWidth(double width) {
            this.width = width;
            this.height = width;
        }

        @Override
        public void setHeight(double height) {
            this.width = height;
            this.height = height;
        }
    }

    public static double resize(Rectangle rectangle, double width, double height) {
        rectangle.setWidth(width);
        rectangle.setHeight(height);

        return rectangle.area();
    }
}
