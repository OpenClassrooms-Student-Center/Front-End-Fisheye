function photographerFactory(data, priceBasis) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const photographerParagraph = document.createElement('p'),
            locationDiv = document.createElement('div')
            taglineDiv = document.createElement('div'),
            priceDiv = document.createElement('div');

        locationDiv.textContent = `${city}, ${country}`;
        taglineDiv.textContent = tagline;
        priceDiv.textContent = price + priceBasis;

        
        article.appendChild(img);
        article.appendChild(h2);

        photographerParagraph.append(locationDiv, taglineDiv, priceDiv)

        article.appendChild(photographerParagraph)

        return (article);
    }
    return { name, picture, getUserCardDOM }
}