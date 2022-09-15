// ici pour récupérer les données nécessaires (id, tagline, city, etc.)

function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.insertAdjacentHTML('beforeend', `
            <a href="https://www.mozilla.com">
                <img src='${picture}' alt='photo de profil'>
                <h2>${name}</h2>
            </a>
            <div>
                <p>${city}, ${country}</p>
                <p>${tagline}</p>
                <small>${price}€/jour</small>
            </div>
            
        `)
        return (article);
    }
    return { name, portrait, id, city, country, tagline, price, getUserCardDOM }
}