function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute('id', `photographer--${id}`);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p_location = document.createElement( 'p' );
        p_location.textContent = `${city}, ${country}`;
        const p_tagline = document.createElement( 'p' );
        p_tagline.textContent = `${tagline}`;
        const p_price = document.createElement( 'p' );
        p_price.textContent = `${price}`;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p_location);
        article.appendChild(p_tagline);
        article.appendChild(p_price);
        return (article);
    }
    return { name, id, city, country, tagline, price, portrait, getUserCardDOM }
}

// class photographerFactory {
//     constructor(data) {
//         this._name
//     }
// }