import * as Constants from "../Constants";

import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Rect } from './Utils';

import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";

export class Game {
    gameWindow;
    frameRequest;

    constructor() {
        this.assetManager = new AssetManager();

        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);

        this.skier = new Skier(0, 0, this.canvas);
        this.rhino = new Rhino(-20, -20, this.canvas);
        this.obstacleManager = new ObstacleManager(this.canvas);

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    async load() {
        await Promise.all([
            this.skier.loadAssets(this.assetManager, Constants.ASSETS.skier),
            this.rhino.loadAssets(this.assetManager, Constants.ASSETS.rhino),
            this.obstacleManager.loadAssets(this.assetManager, Constants.ASSETS.obstacle)
        ]).then(
            resolved => console.log('Game.load() resolved')
        );
    }

    init() {
        this.canvas.currentState = Constants.STATE_SKIING;

        this.obstacleManager.placeInitialObstacles();
    }

    run() {        
        this.updateGameWindow();
        this.drawGameWindow();

        if (this.canvas.currentState===Constants.STATE_EATING) {
            cancelAnimationFrame(this.frameRequest);
        } else {    
            this.frameRequest = requestAnimationFrame(this.run.bind(this));
        }
    }

    updateGameWindow() {
        const previousGameWindow = this.gameWindow;

        this.skier.move();
        this.rhino.move(this.skier);

        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);
        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);

        return this.rhino.checkIfSkierWasChased(this.skier, this.assetManager);
    }

    drawGameWindow() {
        this.canvas.clearCanvas();
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
        this.canvas.setScore(Math.floor(this.skier.y / 54), this.canvas.currentState.substr(0));

        this.skier.draw(this.assetManager);
        this.rhino.draw(this.assetManager);
        this.obstacleManager.drawObstacles(this.assetManager);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    handleKeyDown(event) {
        event.preventDefault();

        switch(event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                break;
            case Constants.KEYS.SPACE:
                if (this.canvas.currentState===Constants.STATE_PAUSED) {
                    this.canvas.currentState = Constants.STATE_SKIING;
                    this.run();
                } else {
                    cancelAnimationFrame(this.frameRequest);
                    this.canvas.currentState = Constants.STATE_PAUSED;
                    this.drawGameWindow();
                }
                break;
            case Constants.KEYS.ESC:
                if (this.canvas.currentState!==Constants.STATE_EATING) break;

                this.skier.init();
                Object.assign(this.rhino, { y: this.skier.y - 100 });

                this.init();
                this.run();
                break;
            default:
                console.log('Other Key pressed:', event.which)
        }
    }
}