import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects } from "../Core/Utils";


export class Skier extends Entity {

    constructor(x, y, canvas) {
        super(x, y, canvas);
        
        this.init();
    }

    init() {
        this.direction = Constants.SKIER_DIRECTIONS.DOWN;
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];

        this.speed = Constants.SKIER_STARTING_SPEED;

        this.jumping_y = 0;
    }

    setDirection(direction) {
        this.direction = direction;
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    getAsset() {
        const asset = super.getAsset()
        return asset[this.assetName] || asset;  //  either Object or String
    }

    move() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    turnLeft() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }
        else
        if(this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
            this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        }
        else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    checkIfSkierHitObstacle(obstacleManager) {
        const skierBounds = this.calcEntityBounds();

        const collision = obstacleManager.getObstacles()
        .find((obstacle, index) => {
            const obstacleAssetName = obstacle.getAssetName();
            const obstacleBounds = obstacle.calcEntityBounds();

            if (intersectTwoRects(skierBounds, obstacleBounds)) {
                if (obstacleAssetName===Constants.JUMP_RAMP) {
                    this.jumping_y = this.y + Constants.SKIER_JUMPING_DISTANCE;
                    this.canvas.currentState = Constants.STATE_JUMPING;
                    return false;
                }
                if (this.jumping_y > this.y && ! [Constants.TREE, Constants.TREE_CLUSTER].includes(obstacleAssetName)) {
                    obstacleManager.jumpOverObstacle(index);
                    return false;
                }
                return true;
            }
            return false;
        });

        if (collision) {
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
            this.canvas.currentState = Constants.STATE_CRASHED;
        }
    }

    draw() {
        if (this.jumping_y && this.jumping_y < this.y) {
            this.jumping_y = 0;
            this.canvas.currentState = Constants.STATE_SKIING;
        }
        super.draw()
    }
}