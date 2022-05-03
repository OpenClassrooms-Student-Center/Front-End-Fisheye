class Api2 {
    /**
     * 
     * @param {string} urlMedia 
     */
    constructor(urlMedia) {
        this._urlMedia = urlMedia
        
    }

    async get() {
        return fetch(this._urlMedia)
            .then(resTwo => resTwo.json())
            .then(resTwo => resTwo.media)
            
            
    }
    
    
    
}


class PhotographerApi2 extends Api2 {
     /**
     * 
     * @param {string} urlMedia 
     */
    constructor(urlMedia) {
        super(urlMedia)
    }
    async getPhotographersMedia(){
        return await this.get()
    }
}