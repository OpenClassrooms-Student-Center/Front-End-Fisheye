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
            .then(res => res.data)
            
    }
    
    
    
}


class PhotographerApi extends Api {
     /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }
    async getPhotographers(){
        return await this.get()
    }
}