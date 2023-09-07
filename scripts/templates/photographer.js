function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/images/photographers/${portrait}`;

    function getUserCardDOM() {
        const elements = `
            <article>
                <img src="${picture}" alt="">
                <h2>${name}</h2>
                <p>${city}, ${country}</p>
                <p>${tagline}</p>
                <small>${price}/jour</small>
            </article>
        `;

        return ( elements );
    }
    return { name, picture, getUserCardDOM }
}