function photographerCard(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    function getUserCardDOM() {
        
        const article = document.createElement( 'article' );
        const card =`
                    <a href="photographer.html?id=${id}" title="${name}">
                        <img class="portrait" src="assets/photographers/portrait/${portrait}" alt="${name}">
                        <h2 class="name">${name}</h2>
                    </a>
                    <p class="location">${city}, ${country}</p>
                    <p class="tagline">${tagline}</p>
                    <p class="price">${price}€/jour</p>
                    `;

    article.innerHTML = card;

    return article;

    }

    return { getUserCardDOM }

}
