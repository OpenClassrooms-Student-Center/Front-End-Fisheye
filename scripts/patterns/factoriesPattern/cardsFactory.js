export default class cardFactory {
    constructor(photographer) {
        this.photographer = photographer
    }
        //Fonction de création de la carte
        createCardPhotographer(){
            // Création du HTML
            const cardSection = document.createElement ('section')
            cardSection.classList.add('photographerCard')
            const cardPhotographer =`
            <a href="photographer.html?id=${this.photographer._id}" role="link" aria-label="Voir le profil de ${this.photographer._name}">
                <img class="photographer_thumbnail" src="${this.photographer._portrait}" alt="${this.photographer._name}">
                <h2 class="photographer_name">${this.photographer._name}</h2>
            </a>
            <p class="photographer_location">${this.photographer._city}, ${this.photographer._country}</p>
            <p class="photographer_tagline">${this.photographer._tagline}</p>
            <span class="photographer_price">${this.photographer._price}€/jour</span>
        `;
        cardSection.innerHTML = cardPhotographer
        return cardSection;
    }
}
           
        
        
        
       