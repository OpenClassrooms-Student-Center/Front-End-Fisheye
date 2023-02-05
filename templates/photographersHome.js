

function createHTML(data) {

    const { id, name, city, country, tagline, price, picture } = data

    const article = document.createElement('article')

    /* On veut que le SR puisse décrire à la personne à quoi correspondent les cartes
        Sinon la personne va entendre le nom d'une ville et une tagline sans aucun contexte
        On rend donc le paragraphe focusable et on y ajoute une description 
    */

    const articleElements = 
        `<a 
            href="./photographer.html?id=${id}" 
            class="photographer-view__link"
            aria-labelledby="id"
        >
            <img src="${picture}" alt="">
            <h2 id="${id}" aria-hidden="true">${name}</h2>
        </a>

        <p class="photographer-view__presentation" tabindex="0" aria-describedby="profile-desc">

            <span id="profile-desc" class="photographer-view__description" aria-hidden="true">
                Aperçu du photographe indiquant sa location, sa tagline et son prix"
            </span>

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

export {createHTML}