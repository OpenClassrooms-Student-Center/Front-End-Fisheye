function mediaFactory(mediaData, photographerData) {
    const { likes, title, image, video } = mediaData;
    const { name } = photographerData;

    //Get first name to access picture folder
    const nameOfPhotographer = name.split(' ');
    pathName = nameOfPhotographer[0].replace('-',' ');
    const mediaPath = `assets/photographers/${pathName}/${!!image ? image : video}`;
    
    function getMediaCardDOM() {
        //DOM elements of media card
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const p = document.createElement('p');
        const media = document.createElement(!!image ? 'img' : 'video');
        const divLikes = document.createElement('div');
        const likesNb = document.createElement('span');
        const heart = document.createElement('i');
        
        //Set attributes and class for the CSS
        media.setAttribute("src", mediaPath);
        divLikes.classList.add('likes');
        heart.classList.add('fa-regular', 'fa-heart');

        //Text injected in HTML elements
        p.textContent = `${title}`;
        likesNb.textContent = `${likes}`;

        //Add created elements in the DOM
        figure.appendChild(media);
        figure.appendChild(figcaption);

        figcaption.appendChild(p);
        figcaption.appendChild(divLikes);

        divLikes.appendChild(likesNb);
        divLikes.appendChild(heart);

        return figure;
    }

    return { getMediaCardDOM, likes }; 
}