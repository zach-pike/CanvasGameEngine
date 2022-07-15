import './style.css'

// @ts-ignore
import { GameEngine, loadImage } from './GameEngine'
import Vec2D from './GameEngine/Vec2d';
import Sprite from './GameEngine/Sprite';
import { demo } from './example';


async function main() {

  // Our game class
  class Game extends GameEngine {
    constructor() { super() }

    async setup() {}
  
    gameLoop(ticker: number, ctx: CanvasRenderingContext2D, mouse: Vec2D): void {
      super.gameLoop(ticker, ctx, mouse); // Clear the canvas

      
      super.nextLoop();            // Start the next frame
    }
  }
  
  let game = new Game();
  await game.run(); 
}

// main()

demo();