//Mettre le code JavaScript lié à la page photographer.html
// ma classe photographerPage retourne le template ou la vue de mes cartes photographer 
class PhotographerPage {
    constructor(photographer, media){
        this._photographer = new Photographer(photographer);
        this._media = new PhotographerMedia(media);
        
       
        // console.log('model = ' + this._media._title);
    }
    
    createPhotographerPage() {
        const altImg = `${this._photographer._name}, ${this._photographer._city}, ${this._photographer._tagline}, ${this._photographer.price}€ par jour`;
        const $articlePage = document.createElement('article');
        const photographerPage =
         `
        <article class="cardPhotographer" role="main">

        <div class="cardPhotographer__infos">
        <h2>${this._photographer.name}</h2>
        <h3>${this._photographer.city}, ${this._photographer.country}</h3>
        <p>${this._photographer.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <img src="${this._photographer.portrait}" alt="${altImg}"/>
        </article>

        <div class="filter">
        <p>Trier par</p>
        <button class="filter_btn">
        <ul class="filter_list">
        <li class="filter_popular">Popularité<i class="fa-solid fa-chevron-down"></i></li>
        <li class="filter_date">Date</li>
        <li class="filter_title">Titre</li>
        </ul>
        </div> 
             
        `
        // console.log('rendu = ' + photographerPage);
        $articlePage.innerHTML = photographerPage;
        return $articlePage;
    }

    createPhotographerMedia() {
        const $articleMedias = document.createElement('article');
        const displayMedias = 
        `
        <div class="mediaDisplay_bloc">
            <a href="#" class="mediaDisplay_link">
                <img src="/assets/photographers/${this._photographer.name}/${this._media.image}" alt="${this.title}"/>
                <p class="mediaDisplay_infosTitle">${this._media.title}</p>
            </a>
            <div class="mediaDisplay_boxLike">
                <p class="mediaDisplay_infosLike">${this._media.likes}</p>
                <i class="fa-solid fa-heart"></i>
            </div>
        </div>
        `

        $articleMedias.innerHTML = displayMedias;
        return $articleMedias;

    }

}



