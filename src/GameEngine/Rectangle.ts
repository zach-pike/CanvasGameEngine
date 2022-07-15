import Vec2D from "./Vec2d";
import IBoundingBox from "./IBoundingBox";
import IDrawable from "./IDrawable";

class Rectangle implements IDrawable, IBoundingBox {
    private debug_mode: boolean = false;

    constructor(private pos: Vec2D, private dimensions: Vec2D, private color = "red") {}

    setPosition(pos: Vec2D) {
        this.pos = pos;
    }
    setDimensions(dim: Vec2D) {
        this.dimensions = dim;
    }

    getPosition(): Vec2D { return this.pos; }
    getDimensions(): Vec2D { return this.dimensions; }

    getColor() { return this.color; }
    setColor(color: string) { this.color = color; }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.getX(), this.pos.getY(), this.dimensions.getX(), this.dimensions.getY());

        if (this.debug_mode) {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 1;
            ctx.strokeRect(this.pos.getX(), this.pos.getY(), this.dimensions.getX(), this.dimensions.getY());
        }

        ctx.restore();
    }

    getDebug()              { return this.debug_mode; }
    setDebug(mode: boolean) { this.debug_mode = mode; }
    toggleDebug()           { this.debug_mode = !this.debug_mode; }

    pointCollides(point: Vec2D) {
        return (point.getX() > this.pos.getX()) 
                && (point.getX() < this.pos.getX() + this.dimensions.getX()) 
                && (point.getY() > this.pos.getY()) 
                && (point.getY() < this.pos.getY() + this.dimensions.getY());
    }
}

export default Rectangle;