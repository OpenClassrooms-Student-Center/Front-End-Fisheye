
// --------------- TEMPLATE HTML POUR LA CARTE D'INFORMATIONS D'UN PHOTOGRAPHE SUR LA PAGE D'ACCUEIL ---------------

/* Crée les éléments html associé au bloc d'informations d'un photographe affiché sur la page d'accueil
    Paramètres :
        - Un objet représentant un photographe
    Renvoie :
        - Un élément HTML article
*/
function createHTML (data) {
    const { id, name, city, country, tagline, price, picture } = data

    const article = document.createElement('article')

    const articleElements =
        `<a 
            href="./photographer.html?id=${id}" 
            class="photographer-view__link"
            aria-labelledby="photographer-name-${id}"
        >
            <img src="${picture}" alt="">
            <h2 id="photographer-name-${id}" aria-hidden="true">${name}</h2>
        </a>

        <p class="photographer-view__presentation" tabindex="0" aria-label="Location, tagline et tarif du photographe">

            <span class="photographer-view__location" > ${city}, ${country} </span>

            <span class="photographer-view__tagline" > 
                ${tagline}
            </span>

            <span class="photographer-view__price" aria-hidden="true" > ${price}€/jour </span>
            <span class="photographer-view__price sr-only"> ${price}€ par jour </span>
        </p>
    `

    article.innerHTML = articleElements

    return article
}

export { createHTML }
