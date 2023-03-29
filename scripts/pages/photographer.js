//Mettre le code JavaScript lié à la page photographer.html
// ma classe photographerPage retourne le template ou la vue de mes cartes photographer 
class PhotographerPage {
    constructor(photographer, media){
        this._photographer = new Photographer(photographer);
        this._media = new PhotographerMedia(media);
       
        console.log('model = ' + this._media._title);
    }
    
    createPhotographerPage() {
        const $articlePage = document.createElement('article');
        const photographerPage =
         `
        <article class="cardPhotographer">

        <div class="cardPhotographer__infos">
        <h2>${this._photographer.name}</h2>
        <h3>${this._photographer.city}, ${this._photographer.country}</h3>
        <p>${this._photographer.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <img src="${this._photographer.portrait}" alt=""/>
        </article>
          
        `
        console.log('rendu = ' + photographerPage)
        $articlePage.innerHTML = photographerPage;
        return $articlePage;
    }
}



