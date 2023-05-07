function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.className += "photographer-card"

        const photographerImg = document.createElement( 'img' );
        photographerImg.setAttribute("src", picture);
        photographerImg.className += "photographer-card__img";

        const photographerName = document.createElement( 'h2' );
        photographerName.textContent = name;
        photographerName.className += "photographer-card__name";

        const photographerLocation = document.createElement("h3");
        photographerLocation.textContent = `${city}, ${country}`;
        photographerLocation.className += "photographer-card__location";

        const photographerTagline = document.createElement("p");
        photographerTagline.textContent = tagline;
        photographerTagline.className += "photographer-card__tagline"

        const photographerPrice = document.createElement("p");
        photographerPrice.textContent = `${price}€/jour`;
        photographerPrice.className += "photographer-card__price"

        article.appendChild(photographerImg)
        article.appendChild(photographerName)
        article.appendChild(photographerLocation);
        article.appendChild(photographerTagline);
        article.appendChild(photographerPrice)

        return (article);
    }
    return { name, picture, getUserCardDOM }
}
