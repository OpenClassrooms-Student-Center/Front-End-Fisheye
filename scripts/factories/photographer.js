function photographerFactory(data) {
    const { id, name, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;
    //const gallery = `assets/photographers/images/${portrait}/`;


    function getUserCardDOM() {
        
        let str =
            `<article>
            <a href="../photographer.html" id="link" title="${name}" >
                <img src="${picture}" alt="photo de ${name}">
                
                <h2 alt= "${name}">${name}</h2>
            </a>
            <h4 alt= "${city}, ${country}">${city}, ${country}</h4>
            <p>${tagline}</p>
            <small>${price}€/jour</small>
          </article>`;
        return (str);
    }
    return {
        id,
        name,
        city,
        country,
        tagline,
        price,
        portrait,
        getUserCardDOM
    }
}
