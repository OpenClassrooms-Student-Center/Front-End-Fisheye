function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const getUserCardDOM = () => {

        // const article = document.createElement( 'article' );
        // article.setAttribute('id', `photographer--${id}`);

        // article.innerHTML = `<img src="assets/photographers/${portrait}">
        //                     <h2>${name}</h2>
        //                     <p>${city}, ${country}</p>
        //                     <p>${tagline}s</p>
        //                     <p>${price}</p>`;

        // return article;

        return document.createRange().createContextualFragment(
                            `<article id=""photographer--${id}">
                                <img src="assets/photographers/${portrait}" alt="portrait de ${portrait}">
                                <h2>${name}</h2>
                                <p class="photographer_section__location">${city}, ${country}</p>
                                <p class="photographer_section__tagline">${tagline}s</p>
                                <p class="photographer_section__price">${price}€/jour</p>
                            </article>`);
    };

    return { name, id, city, country, tagline, price, portrait, getUserCardDOM }
}