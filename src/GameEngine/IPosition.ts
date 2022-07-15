import Vec2D from "./Vec2d";

interface IPosition {
    getPosition: () => Vec2D;
    setPosition: (arg0: Vec2D) => void;
}

export default IPosition;