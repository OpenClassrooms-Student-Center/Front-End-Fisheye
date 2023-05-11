function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const p = document.createElement( 'p' );
        const h5 = document.createElement( 'h5' );
        h2.textContent = name;
        h3.textContent = `${city}, ${country}`;
        p.textContent = tagline;
        h5.textContent = `${price} €/jour`;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(h5);
        return (article);
    }

    // function qui affichera la page d'un seul photographe (id)

    return { name, picture, getUserCardDOM }
}