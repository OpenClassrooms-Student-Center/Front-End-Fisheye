function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price} = data;
    const picture = `./assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement('p');
        location.textContent = city.concat(", ", country); // [city, country];
        const h3 = document.createElement( 'h3' );
        h3.textContent = tagline;
        const h4 = document.createElement( 'h4' );
        h4.textContent = price + '\u20AC/jour';
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location)
        article.appendChild(h3)
        article.appendChild(h4)


        return (article);
    }

    return { name, picture, city, country, tagline, price, getUserCardDOM }
}