import * as Constants from '../../Constants';
import { randomInt } from '../../Core/Utils';
import { Obstacle } from "./Obstacle";

const DISTANCE_BETWEEN_OBSTACLES = Constants.OBSTACLES.DISTANCE_BETWEEN;
const STARTING_OBSTACLE_GAP = 100;
const STARTING_OBSTACLE_REDUCER = 300;
const NEW_OBSTACLE_CHANCE = 8;

export class ObstacleManager {
    obstacles = [];

    constructor(canvas) {
        this.canvas = canvas;
    }

    getObstacles() {
        return this.obstacles;
    }

    drawObstacles(assetManager) {
        this.obstacles.forEach((obstacle) => {
            obstacle.draw(assetManager);
        });
    }

    placeInitialObstacles() {
        const numberObstacles = Math.ceil((Constants.GAME_WIDTH / STARTING_OBSTACLE_REDUCER) * (Constants.GAME_HEIGHT / STARTING_OBSTACLE_REDUCER));

        const minX = -Math.floor(Constants.GAME_WIDTH / 2);
        const maxX = Math.ceil(Constants.GAME_WIDTH / 2);
        const minY = STARTING_OBSTACLE_GAP;
        const maxY = Math.ceil(Constants.GAME_HEIGHT / 2);

        for(let i = 0; i < numberObstacles; i++) {
            this.placeRandomObstacle(minX, maxX, minY, maxY);
        }

        this.obstacles.sort((obstacle1, obstacle2) => {
            return obstacle1.getPosition().y - obstacle2.getPosition().y;
        });
    }

    placeNewObstacle(gameWindow, previousGameWindow) {

        if(! previousGameWindow) return;
        
        const shouldPlaceObstacle = randomInt(1, NEW_OBSTACLE_CHANCE);

        if(shouldPlaceObstacle !== NEW_OBSTACLE_CHANCE) return;

        //  get rid of unused obstacles, keep list skinny
        if(gameWindow.top > this.obstacles[0].y) {
            this.obstacles = this.obstacles.filter( f => f.y > gameWindow.top )
        }

        if(gameWindow.left < previousGameWindow.left) {
            this.placeObstacleLeft(gameWindow);
        }
        else if(gameWindow.left > previousGameWindow.left) {
            this.placeObstacleRight(gameWindow);
        }

        if(gameWindow.top < previousGameWindow.top) {
            this.placeObstacleTop(gameWindow);
        }
        else if(gameWindow.top > previousGameWindow.top) {
            this.placeObstacleBottom(gameWindow);
        }
    };

    placeObstacleLeft(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.left, gameWindow.top, gameWindow.bottom);
    }

    placeObstacleRight(gameWindow) {
        this.placeRandomObstacle(gameWindow.right, gameWindow.right, gameWindow.top, gameWindow.bottom);
    }

    placeObstacleTop(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.top, gameWindow.top);
    }

    placeObstacleBottom(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.bottom, gameWindow.bottom);
    }

    placeRandomObstacle(minX, maxX, minY, maxY) {
        const position = this.calculateOpenPosition(minX, maxX, minY, maxY);
        const newObstacle = new Obstacle(position.x, position.y, this.canvas);

        this.obstacles.push(newObstacle);
    }

    jumpOverObstacle(index) {
        this.obstacles[index].jumpOver = true
    }

    calculateOpenPosition(minX, maxX, minY, maxY, depth = 0) {
        const x = randomInt(minX, maxX);
        const y = randomInt(minY, maxY);

        const foundCollision = this.obstacles.find((obstacle) => {
            return (
                x > (obstacle.x - DISTANCE_BETWEEN_OBSTACLES) &&
                x < (obstacle.x + DISTANCE_BETWEEN_OBSTACLES) &&
                y > (obstacle.y - DISTANCE_BETWEEN_OBSTACLES) &&
                y < (obstacle.y + DISTANCE_BETWEEN_OBSTACLES)
            );
        });

        if(foundCollision) {
            console.log('recalculate open position', minX, maxX, minY, maxY, ++depth, x, y);

            return this.calculateOpenPosition(minX, maxX, minY, maxY, depth);
        }
        else {
            return {
                x: x,
                y: y
            };
        }
    }
}