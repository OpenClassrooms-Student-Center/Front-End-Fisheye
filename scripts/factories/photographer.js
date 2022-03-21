function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);

        const h4 = document.createElement( 'h4' );
        h4.textContent = city + ", " + country;
        article.appendChild(h4);

        const h4tag = document.createElement( 'h4tag' );
        h4tag.textContent = tagline;
        article.appendChild(h4tag);

        const h4price = document.createElement( 'h4price' );
        h4price.textContent = price + "€/jour";
        article.appendChild(h4price);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}