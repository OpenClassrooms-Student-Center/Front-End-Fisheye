function photographerFactory(data) {
    const { id, city, country, name, portrait, price, tagline } = data;
    console.log(data);

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.dataset.id = id;
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p = document.createElement( 'p' );
        p.textContent = `${city}, ${country}`;
        const phrase = document.createElement( 'p' );
        phrase.textContent = tagline;
        const priceText = document.createElement( 'p' );
        priceText.classList.add('price-info');
        priceText.textContent = `${price}€/jour`;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(phrase);
        article.appendChild(priceText);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}