class UserCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    
    getUserCardDOM(){
        const article = document.createElement("article");

        const userCard = `
        <div aria-label="Photographe ${this._photographer.name} de ${this._photographer.city}, ${this._photographer.country}">
            <a href="photographer.html?id=${this._photographer.id}">
            <div><img alt="${this._photographer.name}" src="${this._photographer.portrait}"/></div>
            <h2>${this._photographer.name}</h2>
            </a>
            <p>
                <strong>${this._photographer.city}, ${this._photographer.country}</strong>
                
                ${this._photographer.tagline}
                
                <span>${this._photographer.price}€/jour</span>
            </p> 
        </div>
        `;

        article.innerHTML = userCard;
        return article;
    }

}