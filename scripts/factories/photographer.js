// Créer un article contenant les informations de chaque photographe
function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = 
        `<article class="photographe_article">
            <a href="./photographer.html?id=${id}" class="photographe_article_link">
                <img src="${picture}" alt="${name}" class="photographe_article_img" />
                <h2 class="photographe_article_name">${name}</h2>
            </a>
            <p class="photographe_article_infos photographe_article_city">${city}, ${country}</p>
            <p class="photographe_article_infos photographe_article_tagline">${tagline}</p>
            <p class="photographe_article_infos photographe_article_price">${price}€/jour</p>
        </article>`

        const section = document.createElement('section');
        section.innerHTML = article;
        return section.firstElementChild;
    }

    return { name, picture, getUserCardDOM }
}