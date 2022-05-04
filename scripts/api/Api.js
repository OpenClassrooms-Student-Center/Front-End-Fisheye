class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
        
    }

    async getPhotographer() {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => res)
            .then(res =>
                console.log("Response Message:", res));

            
    }

//    async getMedia(){
//        return fetch(this._url)
//        .then(res2 => res2.json())
//        .then(res2 => res2.media)
//    }
    
    
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
        return await this.getPhotographer()
    }
    // async getMedias(){
    //     return await this.getMedias()
    // }
}

