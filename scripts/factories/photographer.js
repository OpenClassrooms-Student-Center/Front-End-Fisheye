function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const localisationEx = `${city}, ${country}`;
    const prixEx = `${price}€/jour`;

    function getUserCardDOM() {
        //Setup elements
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const nom = document.createElement( 'h2' );
        nom.textContent = name;
        const loca = document.createElement( 'h3' );
        loca.textContent = localisationEx;
        const tag = document.createElement( 'p' );
        tag.textContent = tagline;
        const prix = document.createElement( 'h4' );
        prix.textContent = prixEx;

        //Append
        article.appendChild(img);
        article.appendChild(nom); 
        article.appendChild(loca);
        article.appendChild(tag);
        article.appendChild(prix);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}