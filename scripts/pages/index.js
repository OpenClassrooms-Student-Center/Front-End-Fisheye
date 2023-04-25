// ma classe PhotographersCard retourne le template ou la vue de mes cartes photographers 
class PhotographersCard {
    constructor(photographer){
        this._photographer = new Photographer(photographer);
    }

    createPhotographerCard() {
        const altImg = `${this._photographer._name}, ${this._photographer._city}, ${this._photographer._tagline}, ${this._photographer.price}€ par jour`;
        const $article = document.createElement('article');
        
        const photographerCard = `
            <article>
                <a href="/photographer.html?id=${this._photographer._id}" aria-label="Aller sur la page de ${altImg}">
                    <img src="${this._photographer.portrait}" alt=""/>
                    <h2>${this._photographer._name}</h2>
                    <h3>${this._photographer._city}, ${this._photographer._country}</h3>
                    <p>${this._photographer._tagline}</p>
                    <p class="price">${this._photographer._price}€/jour</p>
                </a>
            </article>
        `
        $article.innerHTML = photographerCard;
        return $article;
    }
}