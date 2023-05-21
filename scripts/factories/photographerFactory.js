// Créer un article contenant les informations de chaque photographe
function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = 
        `<article 
            class="photographe-article" 
            tabindex="0" 
            aria-label="Résumé du photographe ${name}; Ville: ${city}, ${country}; Slogan: ${tagline}; Tarif : ${price} euros par jour"
        >
            <a 
                href="./photographer.html?id=${id}" 
                tabindex="0" 
                class="photographe-article-link" 
                title="Page du photographe ${name}" 
                aria-label="Visiter la page du photographe ${name}"
            >
                <img 
                    src="${picture}" 
                    alt="${name}" 
                    class="photographe-article-img"
                >
                <h2 class="photographe-article-name">${name}</h2>
            </a>
            <p class="photographe-article-infos photographe-article-city">
                ${city}, ${country}
            </p>
            <p class="photographe-article-infos photographe-article-tagline">
                ${tagline}
            </p>
            <p class="photographe-article-infos photographe-article-price">
                ${price}€/jour
            </p>
        </article>`

        const section = document.createElement('section');
        section.innerHTML = article;
        return section.firstElementChild;
    }

    return { name, picture, getUserCardDOM }
}