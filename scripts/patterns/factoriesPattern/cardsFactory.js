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
                <a class="photographer__link"href="photographer.html?id=${this.photographer._id}" role="link" aria-label="Voir le profil de ${this.photographer._name}">
                    <img class="photographer__link--thumbnail" src="${this.photographer._portrait}" alt="${this.photographer._name}">
                    <h2 class="photographer__link--name">${this.photographer._name}</h2>
                </a>
                <div class="photographer__info">
                <p class="photographer__info--location">${this.photographer._city}, ${this.photographer._country}</p>
                <p class="photographer__info--tagline">${this.photographer._tagline}</p>
                <span class="photographer__info--price">${this.photographer._price}€/jour</span>
                </div>
                `;
            cardSection.innerHTML = cardPhotographer
            return cardSection;
        }
}
           
        
        
        
       