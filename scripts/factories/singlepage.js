function singlePageFactory(datas) {
    const { id, name, city, country, tagline, price, portrait, photographerId, title, image, likes, date  } = datas;
    //const picture = `assets/photographers/${portrait}`;
    //const gallery = `assets/photographers/images/${portrait}/`;


    function getMedia() {
        
        const photographer = document.getElementById('idCard');
        const h2 = document.createElement('h2');
        if( id !== photographerId){
            return false;
        } else {
            h2.textContent = title;
            photographer.appendChild(h2);
            console.log(photographer)
        }
    }

    /* function getUserPictures() {
         let str = 
         `<article>
            <a href="${urlPhotographers}.html" title="${name} page">
                <img src="${picture}" alt="photo de ${name}">
                <h2 alt= "${name}">${name}</h2>
            </a>
            <h4 alt= "${city}, ${country}">${city}, ${country}</h4>
            <p>${tagline}</p>
            <small>${price}€/jour</small>
          </article>`; 
        return (str);
    };*/
    return {
        name,
        city,
        country,
        tagline,
        price,
        portrait,
        photographerId, 
        title, 
        image,
        likes, 
        date, 
        getMedia
    }
}