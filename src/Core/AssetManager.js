export class AssetManager {
    constructor() {
    }

    async loadAssets(assets) {
        const myAssets = {}

        for (const [assetName, assetUrl] of Object.entries(assets)) {
            if (typeof(assetUrl)==='object') {
                Object.assign(myAssets, {[assetName]: (await this.loadAssets(assetUrl))})
            } else
            if (typeof(assetUrl)==='string') {
                Object.assign(myAssets, (await this.loadSingleAsset(assetUrl, assetName)))
            } else
            {
                console.log('Unexpected type %s for %s', typeof(assetUrl), assetName)
            }
        }
        return myAssets;
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
}
