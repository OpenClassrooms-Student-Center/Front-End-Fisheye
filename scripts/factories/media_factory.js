class MediaFactory {

    constructor(mediaData, photographerData) {
    // const { likes, title, image, video } = mediaData;
    this.likes = mediaData.likes;
    this.image = mediaData.image;
    this.title = mediaData.title;
    this.video = mediaData.video;
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

}