import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';

export class Game {
    gameWindow = null;
    gameOver = false;
    frameRequest = null;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0, this.canvas);
        this.rhino = new Rhino(-20, -20, this.canvas);
        this.obstacleManager = new ObstacleManager(this.canvas);

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    run() {        
        if (! this.gameOver) {
            this.canvas.clearCanvas();

            this.gameOver = this.updateGameWindow();
            this.drawGameWindow();
            
            this.frameRequest = requestAnimationFrame(this.run.bind(this));
        } else {
            //  game over here
            cancelAnimationFrame(this.frameRequest);
            console.log('THE END (draw Rhino)')
        }
    }

    updateGameWindow() {
        this.skier.move();
        this.rhino.move(this.skier);

        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);

        return this.skier.checkIfSkierWasChased(this.rhino, this.assetManager);
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

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
        switch(event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.SPACE:
                if (this.frameRequest) {
                    cancelAnimationFrame(this.frameRequest);
                    this.frameRequest = null;
                    console.log('Game paused...')
                } else {
                    console.log('Game resumed!')
                    this.run();
                }
                event.preventDefault();
                break;
            case Constants.KEYS.ESC:
                this.gameOver = false;
                Object.assign(this.skier, { x: 0, y: 0 });
                this.skier.init();
                Object.assign(this.rhino, { x: 0, y: -50 });
                this.init();
                this.run();
                event.preventDefault();
                break;
            default:
                console.log('Other Key pressed:', event.which)
        }
    }
}