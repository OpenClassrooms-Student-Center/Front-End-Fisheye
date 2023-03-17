function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/images/Photographers/${portrait}`

    function getUserCardDOM() {
        // article
        const article = document.createElement( 'article' )

        // create link for each photographer with id
        const link = document.createElement("a")
		link.href = `./photographer.html?id=${id}`
        link.title = `Aller vers la page de ${name}`
		article.append(link);

        //img
        const img = document.createElement('img')
        img.setAttribute('src', picture)
        img.title = name
        article.appendChild(img)
        link.appendChild(img) // put <img> into <a>

        // title
        const h2 = document.createElement('h2')
        h2.textContent = name
        article.appendChild(h2)
        link.appendChild(h2) // put <h2> into <a>

        // location (city + country)
        const location = document.createElement('span')
        location.textContent = `${city} , ${country}`
        location.classList.add("photograph-location")
        article.appendChild(location)

        // paragraph
        const paragraph = document.createElement('p')
        paragraph.textContent = tagline
        paragraph.classList.add("photograph-tagline")
        article.appendChild(paragraph)

        // price
        const pricing = document.createElement('span')
        pricing.textContent = `${price}€/jour`
        pricing.classList.add("photograph-price")
        article.appendChild(pricing)

        return article
    }

    function getPhotographerHeaderDOM() {
        const divHeader = document.createElement('div')

        divHeader.innerHTML = `
        <h1>${name}</h1>
        <h3>${city} ${country}</h3>
        <p>${tagline}</p>
        `
        
        return divHeader
    }

    return { picture, getUserCardDOM, getPhotographerHeaderDOM }
}