class MediaFactory {

    constructor(mediaData, photographerData) {
        this.mediaData = mediaData;
        this.likes = mediaData.likes;
        this.image = mediaData.image;
        this.title = mediaData.title;
        this.video = mediaData.video;
        this.name = photographerData.name;

        //Get first name to access medias folder
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

        return {figure};
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

    // static createSortList() {
    //     //Create sort list
    //     const divSortList = document.createElement('div');
    //     divSortList.classList.add('sort_list');
    //     divSortList.innerHTML = 
    //         `<label for="sort_list--select">Trier par
    //         <select name="sort_list" class="sort_list--select">
    //         <option value="popular" class="selected">Popularité</option>
    //         <option value="date">Date</option>
    //         <option value="title">Titre</option>
    //         </select></label>`;
    //         document.querySelector('#main').insertBefore(divSortList, this.mediasSection)
    // }
    static createSortList() {
        //Create sort list
        this.divSortList = document.createElement('div');
        this.divSortList.classList.add('sort_list');
        this.divSortList.innerHTML = 
           `<p class="selected">Populaire<i class="fas fa-chevron-down"></i></p>
           <div class="options hidden">  
               <p class="optDate">Date</p>
               <p class="optTitle">Titre</p>
           </div>`;
        document.querySelector('#main').insertBefore(this.divSortList, this.mediasSection);
    }
    
    static manageSortList(opt){
        this.divSortList.innerHTML = " ";
        if (opt == 'popular') {
            this.divSortList.innerHTML = 
           `<p class="selected">Populaire<i class="fas fa-chevron-down"></i></p>
           <div class="options hidden">  
               <p class="optDate">Date</p>
               <p class="optTitle">Titre</p>
           </div>`;
       } else if (opt == 'date') {
           this.divSortList.innerHTML = 
           `<p class="selected">Date<i class="fas fa-chevron-down"></i></p>
           <div class="options hidden">  
               <p class="optPopular">Populaire</p>
               <p class="optTitle">Titre</p>
           </div>`;
       } else if (opt == 'title') {
           this.divSortList.innerHTML = 
           `<p class="selected">Titre<i class="fas fa-chevron-down"></i></p>
           <div class="options hidden">  
               <p class="optPopular">Populaire</p>
               <p class="optDate">Date</p>
           </div>`;
       }
    }
    

        //     switch (selectedOption) {
        //     case 'popular':
        //         document.querySelector('.sort_list--selected').innerHTML = "Populaire";
        //         option1 = "date";
        //         option2 = "title";
        //         document.querySelector('.sort_list--option1').innerHTML = "Date";
        //         document.querySelector('.sort_list--option2').innerHTML = "Titre";
        //         break;
        //     case 'date':
        //         document.querySelector('.sort_list--selected').innerHTML = "Date";
        //         option1 = "popular";
        //         option2 = "title";
        //         document.querySelector('.sort_list--option1').innerHTML = "Populaire";
        //         document.querySelector('.sort_list--option2').innerHTML = "Titre";
        //         break;
        //     case 'title':
        //         document.querySelector('.sort_list--selected').innerHTML = "Titre";
        //         option1 = "date";
        //         option2 = "popular";
        //         document.querySelector('.sort_list--option1').innerHTML = "Date";
        //         document.querySelector('.sort_list--option2').innerHTML = "Populaire";
        //         break;
        //     default:
        //         document.querySelector('.sort_list--selected').innerHTML = "Populaire";
        //         option1 = "date";
        //         option2 = "title";
        //         document.querySelector('.sort_list--option1').innerHTML = "Date";
        //         document.querySelector('.sort_list--option2').innerHTML = "Titre";
        //         break;
        // }
            
    
}