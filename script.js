class Shape {
    constructor() {
        if (this.constructor === Shape) {
            throw new Error("Abstract class Shape cannot be instantiated directly.");
        }
        
        this.domElement = document.createElement('div');
        this.domElement.classList.add('shape');
        this.domElement.addEventListener('click', () => this.describe());
        this.domElement.addEventListener('dblclick', () => this.domElement.remove());
    }

    drawInCanvas(canvasElement) {
        this.domElement.classList.add(this.constructor.name.toLowerCase());
        this.domElement.style.left = `${Math.random() * (canvasElement.offsetWidth - this.width)}px`;
        this.domElement.style.top = `${Math.random() * (canvasElement.offsetHeight - this.height)}px`;
        canvasElement.appendChild(this.domElement);
    }

    describe() {
        document.getElementById('shapeName').textContent = this.constructor.name;
        document.getElementById('shapeWidth').textContent = this.width || '-';
        document.getElementById('shapeHeight').textContent = this.height || '-';
        document.getElementById('shapeRadius').textContent = this.radius || '-';
        document.getElementById('shapeArea').textContent = this.area();
        document.getElementById('shapePerimeter').textContent = this.perimeter();
    }

    area() {
        throw new Error("Method 'area()' must be implemented.");
    }

    perimeter() {
        throw new Error("Method 'perimeter()' must be implemented.");
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
        this.width = this.radius * 2;  // bounding box width
        this.height = this.radius * 2; // bounding box height
        this.domElement.style.width = `${this.width}px`;
        this.domElement.style.height = `${this.height}px`;
        this.domElement.style.borderRadius = '50%';
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }

    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}

class Triangle extends Shape {
    constructor(height) {
        super();
        this.height = height;
        this.base = height;
        this.width = this.base; // bounding box width
        this.domElement.style.width = `${this.width}px`;
        this.domElement.style.height = `${this.height}px`;
        this.domElement.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
    }

    area() {
        return 0.5 * this.base * this.height;
    }

    perimeter() {
        return this.base + this.height + Math.sqrt(this.base**2 + this.height**2);
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.domElement.style.width = `${this.width}px`;
        this.domElement.style.height = `${this.height}px`;
    }

    area() {
        return this.width * this.height;
    }

    perimeter() {
        return 2 * (this.width + this.height);
    }
}

class Square extends Rectangle {
    constructor(sideLength) {
        super(sideLength, sideLength);
    }
}

// Event listeners:
document.getElementById('insertCircle').addEventListener('click', function() {
    const circle = new Circle(document.getElementById('circleRadius').value);
    circle.drawInCanvas(document.getElementById('canvas'));
});

document.getElementById('insertTriangle').addEventListener('click', function() {
    const triangle = new Triangle(document.getElementById('triangleHeight').value);
    triangle.drawInCanvas(document.getElementById('canvas'));
});

document.getElementById('insertRectangle').addEventListener('click', function() {
    const rectangle = new Rectangle(document.getElementById('rectangleWidth').value, document.getElementById('rectangleHeight').value);
    rectangle.drawInCanvas(document.getElementById('canvas'));
});

document.getElementById('insertSquare').addEventListener('click', function() {
    const square = new Square(document.getElementById('squareSide').value);
    square.drawInCanvas(document.getElementById('canvas'));
});
