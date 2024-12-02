export default class photographerPageHeader {
    constructor(photographer) {
        this.photographer = photographer;
    }
    //Fonction de la création du header de la page photographe
    createPhotographerHeader() {
        const header = document.createElement('header');
        const photographePresentation = `
        <div class="photographerPresentation">
            <h1 class="photographer_name">${this.photographer._name}</h1>
            <p class="photographer_location">${this.photographer._city}, ${this.photographer._country}</p>
            <p class="photographer_tagline">${this.photographer._tagline}</p>            
        </div>
        <button class="contact_button" onclick="displayModal()" aria-label="Ouvrir le formulaire de contact">Contactez-moi</button>
        <img class="photographer_portrait" src="${this.photographer._portrait}" alt="${this.photographer._name}">
        `;
        header.innerHTML = photographePresentation;
        return header;
    }
}