function mediaFactory(mediaData, photographerData) {
    const { likes, title, image } = mediaData;
    const { name } = photographerData;

    //Get first name to access picture folder
    const nameOfPhotographer = name.split(' ');
    pathName = nameOfPhotographer[0].replace('-',' ');

    const picture = `assets/photographers/${pathName}/${image}`;

    function getMediaCardDOM() {
        //DOM elements of media card
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const p = document.createElement('p');
        const img = document.createElement('img');
        const divLikes = document.createElement('likes');
        const heart = document.createElement('i');
        
        //Set attributes and class for the CSS
        img.setAttribute("src", picture);
        divLikes.classList.add('likes');
        heart.classList.add('fa-solid');
        heart.classList.add('fa-heart');

        //Text injected in HTML elements
        p.textContent = `${title}`;
        divLikes.textContent = `${likes}`;

        //Add created elements in the DOM
        figure.appendChild(img);
        figure.appendChild(figcaption);

        figcaption.appendChild(p);
        figcaption.appendChild(divLikes);

        divLikes.appendChild(heart);

        return figure;
    }

    return { getMediaCardDOM };
   
}