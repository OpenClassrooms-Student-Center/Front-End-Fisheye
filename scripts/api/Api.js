class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url, urlMedia) {
        this._url = url
        this._urlMedia = urlMedia
    }

    async get() {
        return fetch(this._url, this._urlMedia)
            .then(res => res.json())
            .then(res => res.photographer)
            // .then(resTwo => resTwo.media)
            
    }
    
    
    
}


class PhotographerApi extends Api {
     /**
     * 
     * @param {string} url 
     */
    constructor(url, urlMedia) {
        super(url, urlMedia)
    }
    async getPhotographers(){
        return await this.get()
    }
}