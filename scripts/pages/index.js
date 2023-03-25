// ma classe PhotographersCard retourne le template ou la vue de mes cartes photographers 
class PhotographersCard {
    constructor(photographer){
        this._photographer = photographer;
    }

    createPhotographerCard() {
        const altImg = `${this._photographer.name}, ${this._photographer.city}, ${this._photographer.tagline}, ${this._photographer.price}€ par jour`;
        const $article = document.createElement('article');

        const photographerCard = `
            <article>
                <a href="/photographer.html?${this._photographer.id}" aria-label="Aller sur la page de ${altImg}">
                    <img src="./assets/photographers/portraitsPhotographers/${this._photographer.portrait}" alt=""/>
                    <h2>${this._photographer.name}</h2>
                    <h3>${this._photographer.city}, ${this._photographer.country}</h3>
                    <p>${this._photographer.tagline}</p>
                    <p class="price">${this._photographer.price}€/jour</p>
                </a>
            </article>
        `
        $article.innerHTML = photographerCard;
        return $article;
    }
}
  
