class Vec2D {
    constructor(private x: number, private y: number) {}

    getX() { return this.x; }
    getY() { return this.y; }

    setX(x: number) { this.x = x; }
    setY(y: number) { this.y = y; }

    // Self functions
    addVecToSelf(vec: Vec2D) { this.x += vec.x; this.y += vec.y; }
    subVecToSelf(vec: Vec2D) { this.x -= vec.x; this.y -= vec.y; }
    mulVecToSelf(vec: Vec2D) { this.x *= vec.x; this.y *= vec.y; }
    divVecToSelf(vec: Vec2D) { this.x /= vec.x; this.y /= vec.y; }

    scale(num: number) { this.x *= num; this.y *= num; }

    // Creates new vec from current vec functions
    addVecNew(vec: Vec2D) { return new Vec2D(this.x + vec.x, this.y + vec.y); }
    subVecNew(vec: Vec2D) { return new Vec2D(this.x - vec.x, this.y - vec.y); }
    mulVecNew(vec: Vec2D) { return new Vec2D(this.x * vec.x, this.y * vec.y); }
    divVecNew(vec: Vec2D) { return new Vec2D(this.x / vec.x, this.y / vec.y); }
}

export default Vec2D;