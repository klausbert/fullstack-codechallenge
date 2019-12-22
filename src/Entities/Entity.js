import { Rect } from "../Core/Utils";


export class Entity {
    x = 0;
    y = 0;

    assetName = '';

    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.canvas = canvas
    }

    getAssetName() {
        return this.assetName;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    calcEntityBounds(assetManager) {
        const asset = assetManager.getAsset(this.assetName);

        return new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );
    }

    draw(assetManager, jumpMode = false) {
        const asset = assetManager.getAsset(this.assetName, jumpMode);
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2;

        this.canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
    }
}