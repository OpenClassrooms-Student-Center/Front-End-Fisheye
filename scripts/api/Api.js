class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)
                .then(res => res.json())                
                .catch(err => console.log('an error occurs', err))
    }
}


class PhotographersApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        const ret = await this.get()

        return ret.photographers
    }

    async getPhotographersAndMedias() {
        const ret = await this.get()
    
        return [ret.photographers,ret.media]
    }
}
