import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";


export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;

    jumping_y = 0;

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
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

    calcSkierBounds(assetManager) {
        const asset = assetManager.getAsset(this.assetName);

        return new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );
    }
    checkIfSkierWasChased(theThing, assetManager) {
        const skierBounds = this.calcSkierBounds(assetManager);

        const thingAsset = assetManager.getAsset(theThing.getAssetName())
        const thingPosition = theThing.getPosition()
        const thingBounds = new Rect(
            thingPosition.x - thingAsset.width / 2,
            thingPosition.y - thingAsset.height / 2,
            thingPosition.x + thingAsset.width / 2,
            thingPosition.y
        );
        const collision = intersectTwoRects(skierBounds, thingBounds);
        
        if (collision) {
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH)
            console.log('Aaaargh! The Thing caught me!')
        }
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        const skierBounds = this.calcSkierBounds(assetManager);

        const collision = obstacleManager.getObstacles()
        .find((obstacle, index) => {
            const obstacleAssetName = obstacle.getAssetName();
            const obstacleAsset = assetManager.getAsset(obstacleAssetName);
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );
            let intersected = intersectTwoRects(skierBounds, obstacleBounds);

            if (intersected && obstacleAssetName===Constants.JUMP_RAMP) {
                this.jumping_y = this.y + Constants.SKIER_JUMPING_DISTANCE;
                intersected = false
            }
            if (intersected && this.jumping_y > this.y && ! [Constants.TREE, Constants.TREE_CLUSTER].includes(obstacleAssetName)) {
                obstacleManager.jumpOverObstacle(index);
                intersected = false
            }
            return intersected
        });

        if(collision) {
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        }
    }
    draw(canvas, assetManager) {
        if (this.jumping_y && this.jumping_y < this.y) {
            this.jumping_y = 0;
        }
        super.draw(canvas, assetManager, this.jumping_y > 0)
    }
}