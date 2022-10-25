// ------------------------ //
// ---> Ici appel Api


class Api {
    constructor(url) {
        this.url = url
    }

    async get() {
        return fetch(this.url)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
export class PhotographersApi extends Api {
    constructor(url) {
        super(url)
    }
    async getAllPhotgraphers() {
        const data = await this.get()
        return data.photographers
    }
    async getOnePhotographer(id) {
        const data = await this.get()
        return data.photographers.find(photographer => photographer.id === id)
    }
    // Media
    async getMediaOnePhotographer(photographerId) {
        const data = await this.get()
        console.log(data);
        return data.media.filter(media => media.photographerId === photographerId)
    }
}

