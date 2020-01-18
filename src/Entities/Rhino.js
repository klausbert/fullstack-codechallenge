import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects } from "../Core/Utils";


export class Rhino extends Entity {
    constructor(x, y, canvas) {
        super(x, y, canvas);

        this.assetName = Constants.RHINO;
    }

    move(target) {
        if (target.y < 1000) return;
        
        const t = Math.random() / (
            target.jumping_y ? 50 : target.direction===Constants.SKIER_DIRECTIONS.DOWN ?  20 : 10
        )
        //  P = (1 - t) P1 + t P2
        this.x = (1 - t) * this.x + t * target.x;
        this.y = (1 - t) * this.y + t * target.y;
    }

    checkIfSkierWasChased(skier) {
        const skierBounds = skier.calcEntityBounds();
        const thingBounds = this.calcEntityBounds();

        const collision = intersectTwoRects(skierBounds, thingBounds);
        
        if (collision) {
            //  #1
            skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH)
            //  #2
            this.canvas.currentState = Constants.STATE_EATING;
        }
    }
}