function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;
    console.log({ name, portrait, city, country, tagline, price });

    const picture = `../assets/photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement('p');
        location.textContent = city + ", " + country;
        location.className = " location"
        const quote = document.createElement('p');
        quote.textContent = tagline;
        quote.style.margin = '0';
        const rate = document.createElement('p');
        rate.textContent = price + "€/jour";
        rate.style.margin = '0';
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(quote);
        article.appendChild(rate);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}
