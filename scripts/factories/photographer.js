function photographerFactory(data, priceBasis) {

    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function createElements() {
        const article = document.createElement( 'article' ),
            link = document.createElement('a'),
            img = document.createElement( 'img' ),
            h2 = document.createElement( 'h2' ),
            paragraph = document.createElement('p'),
            locationDiv = document.createElement('div')
            taglineDiv = document.createElement('div'),
            priceDiv = document.createElement('div');

        return [article, link, img, h2, paragraph, locationDiv, taglineDiv, priceDiv]
    }

    function setAttributes(link, img, paragraph, locationDiv, taglineDiv, priceDiv) {
        link.setAttribute('href', `./photographer.html?id=${id}`)
        link.setAttribute('aria-label', `Lien de redirection vers le profil du photographe ${name}`)
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)        
        paragraph.setAttribute("aria-label", `Paragraphe de présentation du photographe ${name}`)
        locationDiv.setAttribute("aria-label", `Location du photographe ${name}`)
        taglineDiv.setAttribute("aria-label", `Tagline du photographe ${name}`)
        priceDiv.setAttribute("aria-label", `Prix à la journée du photographe ${name}`)        
    }

    function attachContents(h2, locationDiv, taglineDiv, priceDiv) {
        h2.textContent = name;
        locationDiv.textContent = `${city}, ${country}`;
        taglineDiv.textContent = tagline;
        priceDiv.textContent = price + priceBasis;        
    }

    function addClasses(article, link, paragraph, locationDiv, taglineDiv, priceDiv) {
        article.classList.add("photographer-view")
        link.classList.add("photographer-view__link")
        paragraph.classList.add("photographer-view__presentation")
        locationDiv.classList.add("photographer-view__location")
        taglineDiv.classList.add("photographer-view__tagline")
        priceDiv.classList.add("photographer-view__price")        
    }

    function appendChilds(article, link, img, h2, paragraph, locationDiv, taglineDiv, priceDiv) {

        link.append(img, h2)
        
        paragraph.append(locationDiv, taglineDiv, priceDiv)
        
        article.appendChild(link);
        article.appendChild(paragraph)        
    }
    
    function getUserCardDOM() {

        const [article, photographerLink, img, h2, photographerParagraph, locationDiv, taglineDiv, priceDiv] = createElements()

        setAttributes(photographerLink, img, photographerParagraph, locationDiv, taglineDiv, priceDiv)

        attachContents(h2, locationDiv, taglineDiv, priceDiv)

        addClasses(article, photographerLink, photographerParagraph, locationDiv, taglineDiv, priceDiv)
        
        appendChilds(article, photographerLink, img, h2, photographerParagraph, locationDiv, taglineDiv, priceDiv)

        return (article);
    }
    return { name, picture, getUserCardDOM }
}