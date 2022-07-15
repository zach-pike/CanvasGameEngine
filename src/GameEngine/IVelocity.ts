import Vec2D from "./Vec2d";

interface IVelocity {
    setVelocity: (arg0: Vec2D) => void;
    getVelocity: () => Vec2D;
}

export default IVelocity;