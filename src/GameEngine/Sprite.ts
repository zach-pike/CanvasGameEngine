import Vec2D from "./Vec2d";
import IBoundingBox from "./IBoundingBox";
import IDrawable from "./IDrawable";
import IVelocity from "./IVelocity";

class Sprite implements IDrawable, IBoundingBox, IVelocity {
    private dimensions = new Vec2D(0, 0);
    private texture    : HTMLImageElement | null = null;
    private visible    : boolean = true;
    private debug_mode : boolean = false;
    private velocity   = new Vec2D(0, 0);

    constructor(private pos: Vec2D) {}

    setTexture(texture: HTMLImageElement) {
        this.texture = texture;
        this.dimensions = new Vec2D(texture.width, texture.height);
    }

    getTexture() { return this.texture; }

    setVisible(v: boolean) { this.visible = v; }
    getVisible() { return this.visible; }

    getDimensions() : Vec2D { return this.dimensions; }
    getPosition()   : Vec2D { return this.pos; }

    setDimensions(dim: Vec2D) { this.dimensions = dim; }
    setPosition(pos: Vec2D) { this.pos = pos; }

    draw(ctx: CanvasRenderingContext2D) {
        this.pos.addVecToSelf(this.velocity);

        if (this.texture != null && this.visible) ctx.drawImage(this.texture, this.pos.getX(), this.pos.getY(), this.dimensions.getX(), this.dimensions.getY());

        if (this.debug_mode) {
            ctx.save();


            ctx.strokeStyle = "red";
            ctx.lineWidth = 1;
            ctx.strokeRect(this.pos.getX(), this.pos.getY(), this.dimensions.getX(), this.dimensions.getY());


            ctx.restore();
        }

    }

    pointCollides(point: Vec2D) {
        return (point.getX() > this.pos.getX()) 
                && (point.getX() < this.pos.getX() + this.dimensions.getX()) 
                && (point.getY() > this.pos.getY()) 
                && (point.getY() < this.pos.getY() + this.dimensions.getY());
    }

    toggleDebug()           { this.debug_mode = !this.debug_mode }
    setDebug(mode: boolean) { this.debug_mode = mode; }
    getDebug()              { return this.debug_mode; }

    getVelocity() {
        return this.velocity;
    }

    setVelocity(_v: Vec2D) {
        this.velocity = _v;
    }
}


export default Sprite