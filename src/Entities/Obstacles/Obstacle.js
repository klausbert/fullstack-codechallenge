import * as Constants from "../../Constants";
import { Entity } from "../Entity";
import { randomInt } from '../../Core/Utils';

const assetTypes = [
    Constants.TREE,
    Constants.TREE_CLUSTER,
    Constants.ROCK1,
    Constants.ROCK2,
    Constants.JUMP_RAMP
];

export class Obstacle extends Entity {
    constructor(x, y, canvas) {
        super(x, y, canvas);

        const assetIdx = randomInt(0, assetTypes.length - 1);
        this.assetName = assetTypes[assetIdx];

        this.jumpOver = false;
    }
    draw() {
        super.draw()
    }
}