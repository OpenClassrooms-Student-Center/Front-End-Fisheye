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
        
        //Set attributes and class for the CSS
        img.setAttribute("src", picture);
        divLikes.classList.add('likes');

        //Text injected in HTML elements
        p.textContent = `${title}`;
        divLikes.textContent = `${likes}`;

        //Add creates element in the DOM
        figure.appendChild(img);
        figure.appendChild(figcaption);

        figcaption.appendChild(p)
        figcaption.appendChild(divLikes)

        return figure;
    }

    return { getMediaCardDOM };
   
}