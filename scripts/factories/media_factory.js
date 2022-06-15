class MediaFactory {

    constructor(mediaData, photographerData) {
    // const { likes, title, image, video } = mediaData;
    this.likes = mediaData.likes;
    this.image = mediaData.image;
    this.title = mediaData.title;
    this.video = mediaData.video;
    this.mediaData = mediaData;
    // const { name } = photographerData;
    this.name = photographerData.name;

    //Get first name to access picture folder
    const nameOfPhotographer = this.name.split(' ');
    const pathName = nameOfPhotographer[0].replace('-',' ');
    this.mediaPath = `assets/photographers/${pathName}/${!!this.image ? this.image : this.video}`;
    }
    
    getMediaCardDOM() {
        //DOM elements of media card
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const p = document.createElement('p');
        const media = document.createElement(!!this.image ? 'img' : 'video');
        const divLikes = document.createElement('div');
        const likesNb = document.createElement('span');
        const heart = document.createElement('i');
        
        //Set attributes and class for the CSS
        media.setAttribute("src", this.mediaPath);
        divLikes.classList.add('likes');
        heart.classList.add('fa-regular', 'fa-heart');

        //Text injected in HTML elements
        p.textContent = `${this.title}`;
        likesNb.textContent = `${this.likes}`;

        //Add created elements in the DOM
        figure.appendChild(media);
        figure.appendChild(figcaption);
        figcaption.appendChild(p);
        figcaption.appendChild(divLikes);
        divLikes.appendChild(likesNb);
        divLikes.appendChild(heart);

        const likes = this.likes;
        return {figure, likes};
    }

    static createMediaCard(currentMedias, currentPhotographer) {
        
        this.mediasSection = document.querySelector("#medias_section");
        let likesCount = 0;
        this.likesCount = likesCount;
        this.currentPhotographer = currentPhotographer;

        //Create section for each media in DOM
        currentMedias.forEach((media) => {
            const photographerMedia = new MediaFactory(media, currentPhotographer);
            const mediaCardDOM = photographerMedia.getMediaCardDOM();
            this.mediasSection.appendChild(mediaCardDOM.figure);

            this.likesCount += photographerMedia.likes;
        });
    }

    static createPhotographerHeader() {
        //Create the header of photographer's informations
        const photographHeader = document.querySelector(".photograph-header");
        const photographerInfo = new PhotographerFactory(this.currentPhotographer);
        this.photographerInfo = photographerInfo;
        // const {photographerPic, photographerName, divPhotographerInfos} = photographerInfo.getPhotographerInfos();
        this.photographerPic = this.photographerInfo.getPhotographerInfos().photographerPic;
        this.photographerName = this.photographerInfo.getPhotographerInfos().photographerName;
        this.divPhotographerInfos = this.photographerInfo.getPhotographerInfos().divPhotographerInfos;
        this.photographerPic.setAttribute("alt", this.photographerName);
        photographHeader.appendChild(this.photographerPic);
        photographHeader.insertBefore(this.divPhotographerInfos, photographHeader.firstChild);
    }

    static createLikesCountCard() {
        //Create card of likes count and price
        const divLikesPrice = document.createElement('div');
        divLikesPrice.classList.add('likes-price');
        divLikesPrice.innerHTML = `<span class="likes-count">${this.likesCount}</span><i class="fa-solid fa-heart"></i><span>${this.photographerInfo.price}€ / jour</span>`;
        this.mediasSection.appendChild(divLikesPrice);
    }

    static displayNameInModal() {
        //Insert photographer's name in contact modal
        const modalH2 = document.querySelector(".modal h2");
        modalH2.insertAdjacentHTML('beforeend', '<br/>' + this.photographerName);
    }

    static createSortList() {
        //Create sort list
        const divSortList = document.createElement('div');
        divSortList.classList.add('sort_list');
        divSortList.innerHTML = 
            `<label for="sort_list--select">Trier par
            <select name="sort_list" class="sort_list--select">
            <option value="popular">Popularité</option>
            <option value="date">Date</option>
            <option value="title">Titre</option>
            </select></label>`;
            document.querySelector('#main').insertBefore(divSortList, this.mediasSection)
    }
}