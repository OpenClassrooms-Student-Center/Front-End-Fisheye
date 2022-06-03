function mediaFactory(mediaData, photographerData) {
    const { photographerId, title, image } = mediaData;

    //Get first name to access picture folder
    const nameOfPhotographer = photographerData.name.split(' ');
    pathName = nameOfPhotographer[0].replace('-',' ');

    const picture = `assets/photographers/${pathName}/${image}`;

    function getMediaCardDOM() {
        //DOM elements of photographers card's
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const p = document.createElement('p');
        const img = document.createElement('img');

        //Set attributes and class for the CSS
        img.setAttribute("src", picture);

        //Text injected in HTML elements

        //Add creates element in the DOM
        figure.appendChild(img);
        figure.appendChild(figcaption);

        figcaption.appendChild(p)

        return figure;
    }

    return { getMediaCardDOM };
   
}