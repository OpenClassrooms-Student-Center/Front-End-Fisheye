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
        <button class="filter_btn" onclick="displayChevron()">
        <ul class="filter_list">
        <li class="filter_popular">Popularité<span class="chevron-down"><i class="fa-solid fa-chevron-down"></i></span> <span class="chevron-up"><i class="fa-solid fa-chevron-up"></i></span></li>
        <li class="filter_date">Date</li>
        <li class="filter_title">Titre</li>
        </ul>
        </div> 
        <div class="displayTarif">
        <p class="displayTarif_likes">like <i class="fa-solid fa-heart displayTarif_heart"></i></p>
        <p class="displayTarif_price">${this._photographer.price}€/Jour</p>
        </div>
        `
        $articlePage.innerHTML = photographerPage;
        return $articlePage;
    }


    renderMedia(media) {
        if(media.image) {
            return `<img src="/assets/photographers/${this._photographer.name}/${media.image}"  alt="${media.title}"/>`;
        } else if (media.video) {
            return `<video src="/assets/photographers/${this._photographer.name}/${media.video}" poster="" alt="${media.title}"></video>`
        }
    }

    createPhotographerMedia() {
        const $articleMedias = document.createElement('article');

        const displayMedias = 
        `
        <div class="mediaDisplay_bloc">
            <a href="#" class="mediaDisplay_link">
                ${this.renderMedia(this._media)}
                <p class="mediaDisplay_infosTitle">${this._media.title}</p>
            </a>
            <div class="mediaDisplay_boxLike">
                <p class="mediaDisplay_infosLike">${this._media.likes}</p>
                <i class="fa-solid fa-heart mediaDisplay_heart"></i>
            </div>
        </div>
        
        `

        $articleMedias.innerHTML = displayMedias;
        return $articleMedias;

    }

}



