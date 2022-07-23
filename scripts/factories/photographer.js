function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    console.log({ name, portrait, city, country, tagline, price, id });

    const picture = `../assets/photos/Photographers ID Photos/${portrait}`;
    const photographer = `./photographer/photographer.html?id=${id}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const a = document.createElement('a');
        a.setAttribute("href", photographer)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement('p');
        location.textContent = city + ", " + country;
        location.className = " location"
        const quote = document.createElement('p');
        quote.textContent = tagline;
        quote.className = " quote"
        const rate = document.createElement('p');
        rate.textContent = price + "€/jour";
        rate.className = " price"
        article.appendChild(a)
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(location);
        article.appendChild(quote);
        article.appendChild(rate);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}
