export class AssetManager {
    loadedAssets = {};

    constructor() {
    }

    async loadAssets(assets) {
        const assetPromises = [];

        for (const [assetName, assetUrl] of Object.entries(assets)) {
            const assetPromise = this.loadSingleAsset(assetUrl, assetName);
            assetPromises.push(assetPromise); //  TODO: load 2 images (1 for crash mode)
        }

        this.loadedAssets = await Promise.all(assetPromises).then( 
            resolves => resolves.reduce((r, c) => ({...r, ...c }), {}) 
        );
    }

    loadSingleAsset(assetUrl, assetName) {
        return new Promise((resolve) => {
            const assetImage = new Image();
            assetImage.onload = () => {
                assetImage.width /= 2;
                assetImage.height /= 2;

                resolve({ [assetName]: assetImage });
            };
            assetImage.src = assetUrl;
        });
    }

    getAsset(assetName) {
        return this.loadedAssets[assetName];
    }
}