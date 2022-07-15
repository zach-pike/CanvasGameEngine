import { GameEngine, loadImage } from './GameEngine'
import Vec2D from './GameEngine/Vec2d';
import Sprite from './GameEngine/Sprite';

export function demo() {
    async function main() {

    // Our game class
    class Game extends GameEngine {
        private harveys: Sprite[] = [];
        private gameStartTime = Date.now();

        constructor() { super() }

        async setup() {
            let harvey = await loadImage("harvey.png");

            for (let i=0; i < 10; i++) {
                let sx = super.getScreenWidth();
                let sy = super.getScreenHeight();

                let posx = (sx - (harvey.width / 3)) * Math.random();
                let posy = (sy - (harvey.height / 3)) * Math.random();

                let vx = Math.random() * 5 - 2.5;
                let vy = Math.random() * 5 - 2.5;

                let sprite = new Sprite(new Vec2D(posx, posy));
                sprite.setTexture(harvey);
                sprite.setVelocity(new Vec2D(vx, vy));
                sprite.setDimensions(sprite.getDimensions().divVecNew(new Vec2D(3, 3)));

                this.harveys.push(sprite);
            }
        }
    
        gameLoop(ticker: number, ctx: CanvasRenderingContext2D, mouse: Vec2D): void {
            super.gameLoop(ticker, ctx, mouse); // Clear the canvas

            let scx = super.getScreenWidth();
            let scy = super.getScreenHeight();

            this.harveys.forEach(s => {
                let sideHit = 0;
                
                if (s.getPosition().getX() < 0) {
                    s.setVelocity(s.getVelocity().mulVecNew(new Vec2D(-1, 1)));
                    sideHit ++;
                }
                if (s.getPosition().getY() < 0) {
                    s.setVelocity(s.getVelocity().mulVecNew(new Vec2D(1, -1)));
                    sideHit ++;
                }
                if ((s.getPosition().getX() + s.getDimensions().getX()) > scx) {
                    s.setVelocity(s.getVelocity().mulVecNew(new Vec2D(-1, 1)));
                    sideHit ++;
                }
                if ((s.getPosition().getY() + s.getDimensions().getY()) > scy) {
                    s.setVelocity(s.getVelocity().mulVecNew(new Vec2D(1, -1)));
                    sideHit ++;
                }

                if (sideHit > 1) {
                    let timeNow = Date.now();

                    let elapsedTime = timeNow - this.gameStartTime;

                    alert(`Took ${elapsedTime/1000}s for a corner hit!`);

                    this.gameStartTime = timeNow;
                }
                
                s.draw(ctx)
            });
            
            super.nextLoop();            // Start the next frame
        }

        onClick(_vec2D: Vec2D): void {
            for (let i=0; i < this.harveys.length; i++) {
                const harvey = this.harveys[i];

                if (harvey.pointCollides(_vec2D)) {
                    this.harveys.splice(i, 1);
                    break;
                }
            }
        }
    }
    
        let game = new Game();
        await game.run(); 

    }

    main();
}