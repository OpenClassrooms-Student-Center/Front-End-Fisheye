import { cardConstructor } from "../patterns/constructorPattern/cardsConstructor";
export class cardFactory {
    createCard(data) {
        const card = new cardConstructor(data)

        // Création du HTML
        const cardSection = document.createElement ('section')
        //lien vers la page du photographe
        cardSection.classList.add('photographerCard')
     
        const cardLink = document.createElement ('a')
        cardLink.classList.add('cardLink')
        cardLink.innerHTML =`
        <img src = ${data.portrait}>
        <h2> ${data.name}</h2> 
        `       
        
        //Description et présentation du photographe Nolink
        const descriptionContainer = document.createElement('div');
        cardSection.appendChild(descriptionContainer);
        const photographeLocation = document.createElement('h3');
        photographeLocation.textContent = card.location;
        descriptionContainer.appendChild(photographeLocation);
        const taglinePhotographe = document.createElement('h4');
        taglinePhotographe.textContent = card.tagline;
        descriptionContainer.appendChild(taglinePhotographe);
        const photographePrice = document.createElement('p');
        photographePrice.textContent = card.price;

        cardLink.appendChild.add('cardLink');
        return cardSection;
    }
}