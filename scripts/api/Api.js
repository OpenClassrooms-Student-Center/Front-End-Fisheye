class Api {
    static _url = "data/photographers.json"; // API baseURL

    static async response() {
        try {
        const response = await fetch(this._url);

        if (!response.ok) throw new Error(response.status);

        return response.json();
        } catch(error) {
            console.error(error);
        }
    }

    static get() { return this.response(); } // GET Method
}

class PhotographerService extends Api {

    static async getPhotographers() {
        const { photographers } = await this.get();
    
        return photographers;
    }
    
    static async getPhotographerById(id) {
        const photographers = await this.getPhotographers();
        const photographerById = photographers.find(photographer => photographer.id == id);
    
        return photographerById;
    }
}