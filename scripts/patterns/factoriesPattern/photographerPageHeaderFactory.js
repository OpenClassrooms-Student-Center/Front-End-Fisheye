export default class PhotographerPageHeader {
    constructor(photographer) {
        this.photographer = photographer;
    }
    //Méthode de la création du header de la page photographe
   /**
    * @description - Crée le header de la page photographe
    * @returns {string} - Retourne le header de la page photographe
    */
    createPhotographerHeader() {
        const header = document.querySelector('.photograph__header');        
        const presentation = `
        <div id="${this.photographer._id}" class="photograph__profile">
            <h1 class="photograph__profile--name">${this.photographer._name}</h1>
            <h2 class="photograph__profile--location">${this.photographer._city}, ${this.photographer._country}</h2>
            <p class="photograph__profile--tagline">${this.photographer._tagline}</p>            
        </div>
        <button id="openModalJS" class="contact__button" aria-label=" Contactez-moi, Ouvrir le formulaire de contact">Contactez-moi</button>
        <img class="photograph__profile--portrait" src="${this.photographer._portrait}" alt="${this.photographer._name}">
        `;            
        header.innerHTML = presentation;
        return header;
    }
}