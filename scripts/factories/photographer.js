function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const city = document.createElement( 'city');
        city.textContent = city;
        const country = document.createElement( 'country');
        country.textContent = country;
        const tagline = document.createElement( 'tagline');
        tagline.textContent = tagline;
        const price = document.createElement ('price');
        price.textContent = price;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(city);
        article.appendChild(country);
        article.appendChild(tagline);
        article.appendChild(price);
        return (article);
    }
    return { name, picture,  getUserCardDOM }
}