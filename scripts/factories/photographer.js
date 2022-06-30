function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("class", "photographer_profil");
        const link = document.createElement("a");
        link.setAttribute("href", `photographer.html?id=${id}`);
        article.appendChild(link);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.setAttribute("class", "picture_profil");
        img.setAttribute
        link.appendChild(img);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("class", "h2");
        article.appendChild(h2);
        const photographersInfo = document.createElement("div");
        article.appendChild(photographersInfo);
        const cityAndCountry = document.createElement('h3');
        cityAndCountry.textContent = `${city}, ${country}`;
        cityAndCountry.setAttribute("class", "h3");
        photographersInfo.appendChild(cityAndCountry);
        const taglineP = document.createElement('p');
        taglineP.textContent = `${tagline}`;
        taglineP.setAttribute("class", "text_description");
        photographersInfo.appendChild(taglineP);
        const priceP = document.createElement('p');
        priceP.setAttribute("class", "price");
        priceP.textContent = `${price}€/jour`;
        priceP.setAttribute("class", "prix");
        photographersInfo.appendChild(priceP);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}