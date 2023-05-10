export function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.className += "photographer"

        const photographerLink = document.createElement("a");
        photographerLink.setAttribute("href", `/photographer.html?id=${id}`);
        photographerLink.setAttribute("aria-label", `lien vers le portfolio de ${name}`);
        photographerLink.className += "photographer__link"

        const photographerImg = document.createElement( 'img' );
        photographerImg.setAttribute("src", picture);
        photographerImg.setAttribute("alt", name);
        photographerImg.className += "photographer__img";

        const photographerName = document.createElement( 'h2' );
        photographerName.textContent = name;
        photographerName.className += "photographer__name";

        const photographerLocation = document.createElement("h3");
        photographerLocation.textContent = `${city}, ${country}`;
        photographerLocation.className += "photographer__location";

        const photographerTagline = document.createElement("p");
        photographerTagline.textContent = tagline;
        photographerTagline.className += "photographer__tagline"

        const photographerPrice = document.createElement("p");
        photographerPrice.textContent = `${price}€/jour`;
        photographerPrice.className += "photographer__price"

        article.appendChild(photographerLink)
        photographerLink.appendChild(photographerImg)
        photographerLink.appendChild(photographerName)
        article.appendChild(photographerLocation);
        article.appendChild(photographerTagline);
        article.appendChild(photographerPrice)

        return (article);
    }
    return { name, picture, getUserCardDOM }
}
