import IPosition from "./IPosition";
import Vec2D from "./Vec2d";

interface IBoundingBox extends IPosition {
    getDimensions: () => Vec2D;
    setDimensions: (arg0: Vec2D) => void;

    pointCollides: (Vec2D: Vec2D) => boolean;

    toggleDebug: () => void;
    setDebug: (arg0: boolean) => void;
    getDebug: () => boolean;
}

export default IBoundingBox