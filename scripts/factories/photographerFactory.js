function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const p = document.createElement( 'p' );
        const h5 = document.createElement( 'h5' );

        img.setAttribute("src", picture)
        img.setAttribute("alt",`Photo du photographe`);
        img.setAttribute("aria-label",`Photo du photographe ${name}`);
        h5.setAttribute("aria-label", "Le prix journalier du photographe")

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