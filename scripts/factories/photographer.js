// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
    const { name, portrait, price, tagline, city, country, id } = data;

    const picture = `assets/photos/profile/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        link.setAttribute("href", `photographer.html?id=${id}`);
        link.classList.add('link-wrapper');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute('alt', `Portrait de ${name}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const localization = document.createElement( 'p' );
        localization.classList.add('localization')
        localization.textContent = `${city}, ${country}`;
        const tag = document.createElement( 'p' );
        tag.classList.add('accroche')
        tag.textContent = tagline;
        const hourlyRate = document.createElement( 'p' );
        hourlyRate.classList.add('price');
        hourlyRate.textContent = `${price}€/jour`;
        article.appendChild(link);
        link.appendChild(img)
        link.appendChild(h2);
        article.appendChild(localization);
        article.appendChild(tag);
        article.appendChild(hourlyRate);
        return (article);
    }
    return { name, picture, price, tagline, city, country, getUserCardDOM }
}