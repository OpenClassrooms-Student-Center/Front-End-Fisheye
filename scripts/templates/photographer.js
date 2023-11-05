function photographerTemplate(data) {
    const { id, name, city, country, tagline, price, portrait } = data;

    const picture = `assets/images/photographers/${portrait}`;

    function getUserCardDOM() {
        const elements = `
            <article>
                <a href="photographer.html?id=${id}" role="link" aria-label="Voir le profil de ${name}">
                    <div>
                        <img src="${picture}" alt="${name}">
                        <h2>${name}</h2>
                    </div>
                </a>
                <div>
                    <p>${city}, ${country}</p>
                    <p>${tagline}</p>
                    <small>${price}€/jour</small>
                </div>
            </article>
        `;

        return ( elements );
    }
    return { name, picture, getUserCardDOM }
};