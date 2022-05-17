function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h4 = document.createElement( 'h4' );
        h4.textContent = city + ', ' + country;
        const p = document.createElement( 'p' );
        p.textContent = tagline;
        const small = document.createElement( 'small' );
        small.textContent = price + '€/jours';
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h4);
        article.appendChild(p);
        article.appendChild(small);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}