export default class SingletonMedia {
    constructor() {
        if (SingletonMedia.instance) {
            return SingletonMedia.instance;
        }

        this.imageCache = new Map();
        SingletonMedia.instance = this;
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            if (this.imageCache.has(src)) {
                resolve(this.imageCache.get(src));
            } else {
                const img = new Image();
                img.onload = () => {
                    this.imageCache.set(src, img);
                    resolve(img);
                };
                img.onerror = reject;
                img.src = src;
            }
        });
    }
}


// Créez une instance unique de SingletonMedia et la geler pour empêcher les modifications
const singletonMedia = new SingletonMedia();
Object.freeze(singletonMedia);

export { singletonMedia };