function photographerFactory(data) {
    const { name, portrait, tagline, city, country, price } = data;

    const picture = `assets/photographers/${portrait}`;
    
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const location = document.createElement( 'p' );
        const tag = document.createElement( 'p' );
        const pricing = document.createElement( 'p' );
        
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        location.textContent = city + ', ' + country;
        tag.textContent = tagline;
        pricing.textContent = price + '€/jour';

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(tag);
        article.appendChild(pricing);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}