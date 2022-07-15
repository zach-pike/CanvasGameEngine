import Vec2D from "./Vec2d";
import IBoundingBox from "./IBoundingBox";
import IDrawable from "./IDrawable";

class Text implements IDrawable, IBoundingBox {
    private color      : string = "red";
    private font       : string = "Arial";
    private font_sz    : number = 24;
    private debug_mode : boolean = false;

    constructor(private pos: Vec2D, private text: string) {}

    // Dummy functions for now
    setWidth(_n: number)  {}
    setHeight(_n: number) {}
    setDimensions(_n: Vec2D) {}

    setFontSize(pt: number) { this.font_sz = pt;   }
    getFontSize()           { return this.font_sz; }

    setFont(font: string)   { this.font = font; }
    getFont()               { return this.font; }

    getDimensions(): Vec2D {
        let context = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
        context.fillStyle = this.color;
        context.font = `${this.font_sz}px ${this.font}`;

        let metrics = context.measureText(this.text);
        
        
        return new Vec2D(metrics.width, metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
    }
    getPosition():   Vec2D { return this.pos; }

    setPosition(pos: Vec2D) { this.pos = pos; }


    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.fillStyle = this.color;
        ctx.font = `${this.font_sz}px ${this.font}`

        ctx.fillText(this.text, this.pos.getX(), this.pos.getY());

        ctx.restore();
    }

    pointCollides(_Vec2D: Vec2D) {
        return false;
    }

    toggleDebug() { this.debug_mode = !this.debug_mode; }
    getDebug() { return this.debug_mode; }
    setDebug(mode: boolean) { this.debug_mode = mode; }
}

export default Text;