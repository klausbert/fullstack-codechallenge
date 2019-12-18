export class AssetManager {
    loadedAssets = {};
    loadedJumps = {};

    constructor() {
    }

    async loadAssets(assets) {
        const assetPromises = [];
        const jumpPromises = [];

        for (const [assetName, assetUrl] of Object.entries(assets)) {
            assetPromises.push(this.loadSingleAsset(assetUrl[0], assetName));
            
            if (assetUrl.length==2) {
                jumpPromises.push(this.loadSingleAsset(assetUrl[1], assetName));
            }
        }
        this.loadedAssets = await Promise.all(assetPromises).then( 
            resolves => resolves.reduce((r, c) => ({...r, ...c }), {}) 
        );
        this.loadedJumps = await Promise.all(jumpPromises).then( 
            resolves => resolves.reduce((r, c) => ({...r, ...c }), {}) 
        );
        console.log(assetPromises, this.loadedAssets)
        console.log(jumpPromises, this.loadedJumps)
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

    getAsset(assetName, isJumping) {
        if (isJumping) {
            // console.log('getAsset should return the "jumping" version...')
            if (this.loadedJumps[assetName]) {
                // console.log('...which is ', this.loadedJumps[assetName])
                return this.loadedJumps[assetName]
            }
        } 
        return this.loadedAssets[assetName];
    }
}
