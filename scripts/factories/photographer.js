function photographerFactory(data, priceBasis) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const photographerParagraph = document.createElement('p'),
            locationDiv = document.createElement('div')
            taglineDiv = document.createElement('div'),
            priceDiv = document.createElement('div');

        photographerParagraph.setAttribute("aria-label", "Paragraphe de présentation du photographe")
        locationDiv.textContent = `${city}, ${country}`;
        taglineDiv.textContent = tagline;
        priceDiv.textContent = price + priceBasis;

        article.classList.add("photographer-view")
        photographerParagraph.classList.add("photographer-view__presentation")
        locationDiv.classList.add("photographer-view__location")
        taglineDiv.classList.add("photographer-view__tagline")
        priceDiv.classList.add("photographer-view__price")
        
        article.appendChild(img);
        article.appendChild(h2);

        photographerParagraph.append(locationDiv, taglineDiv, priceDiv)

        article.appendChild(photographerParagraph)

        return (article);
    }
    return { name, picture, getUserCardDOM }
}