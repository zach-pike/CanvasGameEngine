import Vec2D from "./Vec2d";

export async function loadImage(source: string): Promise<HTMLImageElement> {
    let img = new Image();
    img.src = source;

    return new Promise((resolve, _reject) => {
        let event_handler = () => {
            img.removeEventListener("load", event_handler);
            resolve(img);
        }
        img.addEventListener("load", event_handler);

    })
}

export class GameEngine {
    private canvas: HTMLCanvasElement     | null = null;
    private ctx: CanvasRenderingContext2D | null = null;

    private clear_color: string = "lightblue";

    private mouse_x    : number = 0;
    private mouse_y    : number = 0;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight;

        this.canvas.addEventListener("mousemove", (e) => {
            this.mouse_x = e.offsetX;
            this.mouse_y = e.offsetY;
            this.onMove(new Vec2D( e.offsetX, e.offsetY ));
        })

        this.canvas.addEventListener("click", (e) => {
            this.onClick(new Vec2D( e.offsetX, e.offsetY ));
        })


        document.body.appendChild(this.canvas);
    }

    getMouseX() { return this.mouse_x; }
    getMouseY() { return this.mouse_y; }

    getScreenWidth()  { return this.canvas?.width as number;  }
    getScreenHeight() { return this.canvas?.height as number; }

    getMousePos() { return [ this.mouse_x, this.mouse_y ]; }

    setClearColor(color: string) { this.clear_color = color; }
    getClearColor()              { return this.clear_color;  }

    nextLoop() {
        window.requestAnimationFrame((t) => 
            this.gameLoop(t, this.ctx as CanvasRenderingContext2D, new Vec2D(this.getMouseX(), this.getMouseY()) )
        );
    }
    async run() {
        await this.setup()
        this.nextLoop()
    }

    async setup() {}
    onClick(_vec2D: Vec2D) {}
    onMove(_vec2D:  Vec2D) {}
    gameLoop(_ticker: number, ctx: CanvasRenderingContext2D, _mouse: Vec2D) {
        ctx.save();

        ctx.fillStyle = this.clear_color;
        ctx.fillRect(0, 0, this.canvas?.width as number, this.canvas?.height as number);

        ctx.restore();
    }
}