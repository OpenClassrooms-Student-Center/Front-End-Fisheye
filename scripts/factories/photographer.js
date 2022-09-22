function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const getUserCardDOM = () => {

        const article = document.createElement( 'article' );
        article.setAttribute('id', `photographer--${id}`);

        article.innerHTML = `<img src="assets/photographers/${portrait}">
                            <h2>${name}</h2>
                            <p>${city}, ${country}</p>
                            <p>${tagline}s</p>
                            <p>${price}</p>`;

        return article;
    };

    return { name, id, city, country, tagline, price, portrait, getUserCardDOM }
}