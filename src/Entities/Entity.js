import { Rect } from "../Core/Utils";


export class Entity {
    x = 0;
    y = 0;
    assetName = '';

    loadedAssets = {};

    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.canvas = canvas
    }

    async loadAssets(assetManager, assets) {
        this.loadedAssets = await assetManager.loadAssets(assets);
        
        return this.loadedAssets
    }

    getAsset() {
        const asset = this.loadedAssets[this.canvas.currentState]

        if (! asset) {
            const defaultState = Object.keys(this.loadedAssets)[0]
            
            return this.loadedAssets[defaultState]
        } 
        return asset
    }

    getAssetName() {
        return this.assetName;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    calcEntityBounds() {
        const asset = this.getAsset();

        return new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );
    }

    draw() {
        const asset = this.getAsset();
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2;

        this.canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
    }
}