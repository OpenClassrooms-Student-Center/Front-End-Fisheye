function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.alt = `Photo de ${name}`;
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const pVille = document.createElement( 'p' );
        pVille.textContent = `${city}, ${country}`;
        pVille.classList.add('ville');
        const pTagline = document.createElement( 'p' );
        pTagline.textContent = tagline;
        pTagline.classList.add('tagline');
        const pPrice = document.createElement( 'p' );
        pPrice.textContent = `${price}€/jour`;
        pPrice.classList.add('price');
        const link = document.createElement( 'a' );
        link.href = `photographer.html?id=${id}`;
        
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(pVille);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
                
        return (article);
    }
    return { name, picture, id, city, country, tagline, price, getUserCardDOM }
    
}
export { photographerFactory };