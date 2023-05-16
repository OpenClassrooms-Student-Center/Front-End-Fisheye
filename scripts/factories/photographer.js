export function photographerFactory(photographer) {
    const { id, name, portrait, city, country, tagline, price } = photographer;
    // console.log(photographer);

    const picture = `assets/photographers/${portrait}.webp`;

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

    function getUserHeader() {
        const photographerHeader = `
        <div class="photographer__info">
            <h2 class="photographer__name photographer__name--doubled">${name}</h2>
                <p class="photographer__location photographer__location--doubled">${city}, ${country}</p>
                <p class="photographer__tagline photographer__tagline--doubled">${tagline}</p>
        </div>
        <button class="contact__button button" aria-label="contact me">Contactez-moi</button>
        <img src="./assets/photographers/${portrait}.webp" alt="${name}" class="photographer__img">
        `
        return photographerHeader
    }
    return { name, picture, price, getUserCardDOM, getUserHeader }
}
