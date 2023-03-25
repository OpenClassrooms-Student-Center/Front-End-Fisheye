// je crée une classe Api pour recupérer mes requetes HTTP avec la méthode fetch 
class Api {
    /**
     * @param {string} url
     */
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)
        .then(res => res.json())
        .then(res => res.photographers)
        .catch(err => console.log('Erreur de chargement du fichier', err));
    }
}

// j'utilise la classe GetPhotographers pour appeler les données transformé par ma classe Api 
class GetPhotographers extends Api {
    /**
     * 
     * @param {string} url
     */
    constructor(url) {
        super(url)
    }

    async getPhotograph() {
        return await this.get()
    }
}