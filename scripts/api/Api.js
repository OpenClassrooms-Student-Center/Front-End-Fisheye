class Api {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        this._url = url
    }

    async getP() {
        return fetch(this._url)
            .then((res) => res.json())
            .then((res) => res.photographers)
            .catch((err) => console.log('an error', err))
    }

    async getM() {
        return fetch(this._url)
            .then((res) => res.json())
            .then((res) => res.media)
            .catch((err) => console.log('an error', err))
    }
}

class PhotographerApi extends Api {
    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        return this.getP()
    }
}

class MediaApi extends Api {
    constructor(url) {
        super(url)
    }

    async getMedia() {
        return this.getM()
    }
}
