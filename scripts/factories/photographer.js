function photographerFactory(data) {
    const { id, name, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;
    //const gallery = `assets/photographers/images/${portrait}/`;


    function getUserCardDOM() {
        let str =
            `<article>
            <a href="photographer.html" id="urlUser" title="${name} page" onclick='getUrl()'>
                <img src="${picture}" alt="photo de ${name}">
                
                <h2 alt= "${name}">${name}</h2>
            </a>
            <h4 alt= "${city}, ${country}">${city}, ${country}</h4>
            <p>${tagline}</p>
            <small>${price}€/jour</small>
          </article>`;
        return (str);
    }
    function getUserIdDOM() {
        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(h2);
        return (article);
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
        getUserCardDOM,
        getUserIdDOM
    }
}