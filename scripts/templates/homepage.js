function homepageTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/images/Sample Photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute('aria-label', `Carte du photographe ${name}`)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const photographer = document.createElement('div');
        photographer.className = 'photographer_identity'
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const p = document.createElement( 'p' );
        const p2 = document.createElement( 'p' );
        p2.className = 'price'

        h2.textContent = name;
        h3.textContent = `${city}, ${country} `;
        p.textContent = tagline;
        p2.textContent = `${price}Є/jour`;

        const linkPhotographer = document.createElement('a');
        linkPhotographer.setAttribute("href", `photographer.html?id=${id}`);
        linkPhotographer.appendChild(photographer)
        photographer.appendChild(img);
        photographer.appendChild(h2);

        const infoPhotographer = document.createElement('div');
        infoPhotographer.className = 'info_photographer'
        infoPhotographer.appendChild(h3);
        infoPhotographer.appendChild(p);
        infoPhotographer.appendChild(p2);


        article.appendChild(linkPhotographer);
        article.appendChild(infoPhotographer);
        return (article);
    }

    return { name, picture, getUserCardDOM }
}
