function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement("a");
        link.setAttribute("href", `photographer.html?id=${id}`);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.setAttribute("class", "picture_profil");
        link.appendChild(img);
        article.appendChild(link);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(h2);
        const photographersInfo = document.createElement("div");
        photographersInfo.setAttribute("class", "photographer_description");
        article.appendChild(photographersInfo);
        const cityAndCountry = document.createElement('h3');
        cityAndCountry.textContent = `${city}, ${country}`;
        photographersInfo.appendChild(cityAndCountry);
        const taglineP = document.createElement('p');
        taglineP.setAttribute("class", "text_description");
        taglineP.textContent = `${tagline}`;
        photographersInfo.appendChild(taglineP);
        const priceP = document.createElement('p');
        priceP.setAttribute("class", "price");
        priceP.textContent = `${price}`;
        photographersInfo.appendChild(priceP);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}