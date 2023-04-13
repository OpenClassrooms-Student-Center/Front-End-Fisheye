export class PhotographersModel {

    constructor (url) {
        this.url = url
    }

    //

    async getPhotographers() {
        return fetch(this.url)
            .then(response => response.json())
            .then(response => {
                return response.photographers
            })
            .catch(err => {
                throw new Error('Impossible de contacter le serveur pour getPhotographers')
            })
    }

    //

    async getPhotographerById(userId) {
        return fetch(this.url)
            .then(response => response.json())
            .then(response => {
            return response.photographers.find((element) => element.id == userId)
        })
            .catch(err => {
            throw new Error('Impossible de contacter le serveur pour getPhotographersById')
        })
    }
    //     try {
    //         let retourApi = await fetch('data/photographers.json')
    //         return retourApi.photographers.find((element) => element.id == idPhotographer).json();
    //     } catch (error) {
    //         throw new Error('Impossible de contacter le serveur pour getPhotographersById')
    //     }
    // }

    async getMediaForOnePhotographer(userId) {
        return fetch(this.url)
        .then(response => response.json())
        .then(response => {
            return response.media.filter(media => media.photographerId == userId)
        })
        .catch(err => {
            throw new Error('Impossible de contacter le serveur pour getPhotographersById')
        })
    }

    sortFakeData(){
        return []
    }
}
