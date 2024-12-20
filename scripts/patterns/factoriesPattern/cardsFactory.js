/**
 * Class CardFactory
 * @class CardFactory   -   Création de la carte du photographe
 * @constructor - Crée une nouvelle instance de la classe CardFactory
 * @param {Object} photographer - Données du photographe
 * @returns {HTMLElement} - Retourne la carte du photographe
 */
export default class CardFactory {
    constructor(photographer) {
        this.photographer = photographer
    }
        //Fonction de création de la carte
        /**
         * @description - Crée la carte du photographe            
         * @returns {HTMLElement} - Retourne la carte du photographe        
         * @returns {string} - Retourne la carte du photographe
         */
        createCardPhotographer(){
            // Création du HTML
            const cardSection = document.createElement ('section')
            cardSection.classList.add('photographerCard')
            const cardPhotographer =`
                <a class="photographer__link"href="photographer.html?id=${this.photographer._id}" aria-label="Voir le profil de ${this.photographer._name}">
                    <img class="photographer__link--thumbnail" src="${this.photographer._portrait}" alt="Photo de ${this.photographer._name}">
                    <h2 class="photographer__link--name">${this.photographer._name}</h2>
                </a>
                <div class="photographer__info">
                <h3 class="photographer__info--location">${this.photographer._city}, ${this.photographer._country}</h3>
                <h4 class="photographer__info--tagline">${this.photographer._tagline}</h4>
                <span class="photographer__info--price">${this.photographer._price}€/jour</span>
                </div>
                `;
            cardSection.innerHTML = cardPhotographer
            return cardSection;
        }
}
           
        
        
        
       