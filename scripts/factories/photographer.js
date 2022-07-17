function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        const photographerCity = document.createElement('p');
        const photographerTagline = document.createElement('span');
        const photographerPrice = document.createElement('p');
        h2.textContent = name;
        photographerCity.textContent = `${city}, ${country}`;
        photographerTagline.textContent = tagline;
      photographerPrice.textContent = `${price}€/jour`;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(photographerCity);
        article.appendChild(photographerTagline);
        article.appendChild(photographerPrice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
