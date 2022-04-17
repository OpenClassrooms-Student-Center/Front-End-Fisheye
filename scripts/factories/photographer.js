function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const a = document.createElement( 'a' );
        a.setAttribute("href", `/photographer.html?photographerId=${id}`);
        a.setAttribute("aria-label", `${name}`);

        const p = document.createElement( 'p' );

        const spanLocation = document.createElement( 'span' );
        spanLocation.setAttribute("class", "location");
        spanLocation.textContent = `${city}, ${country}`;

        const spanTagline = document.createElement( 'span' );
        spanTagline.setAttribute("class", "tagline");
        spanTagline.textContent = `${tagline}`;

        const spanPrice = document.createElement( 'span' );
        spanPrice.setAttribute("class", "price");
        spanPrice.textContent = `${price}/jour`;
        
        a.appendChild(img);
        a.appendChild(h2);

        p.appendChild(spanLocation);
        p.appendChild(spanTagline);
        p.appendChild(spanPrice);

        article.appendChild(a);
        article.appendChild(p);
        
        return article;
    }

    return { name, id, city, country, tagline, price, picture, getUserCardDOM };
}