import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';

export class Game {
    gameWindow;
    frameRequest;

    gameOver;
    statusText;

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
        this.gameOver = false;
        this.statusText = 'Running!';

        this.obstacleManager.placeInitialObstacles();
    }

    run() {        
        this.canvas.clearCanvas();

        if (this.updateGameWindow()) {
            this.gameOver = true;
            this.statusText = 'GAME OVER';
        }
        this.drawGameWindow();

        if (this.gameOver) {
            cancelAnimationFrame(this.frameRequest);
        } else {    
            this.frameRequest = requestAnimationFrame(this.run.bind(this));
        }
    }

    updateGameWindow() {
        this.skier.move();
        this.rhino.move(this.skier);

        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);

        return this.rhino.checkIfSkierWasChased(this.skier, this.assetManager);
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
        this.canvas.setText('Score: '+ Math.floor(this.skier.y / 54), this.statusText);
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
                if (this.frameRequest) {
                    cancelAnimationFrame(this.frameRequest);
                    this.frameRequest = null;
                    this.statusText = 'Paused...';
                    this.drawGameWindow();
                } else {
                    this.statusText = 'Running!';
                    this.run();
                }
                break;
            case Constants.KEYS.ESC:
                if (! this.gameOver) break;

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