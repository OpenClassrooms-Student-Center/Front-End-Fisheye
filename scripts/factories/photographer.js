function photographerFactory(data) {

    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/images/Photographers/${portrait}`

    function getUserCardDOM() {
        // article
        const article = document.createElement( 'article' )

        // create link for each photographer with id
        const link = document.createElement("a")
		link.href = `./photographer.html?id=${id}&sort=popularity` // set ordering by popularity
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

    // add Header infos for Photographer's single page
    function getPhotographerHeaderDOM() {
        const divHeader = document.createElement('div')
        divHeader.className = "headerMain"
        
        divHeader.innerHTML = `
        <div class="colOne">
            <h1 class="headerName">${name}</h1>
            <h3 class="headerLocation">${city}, ${country}</h3>
            <p class="headerTagline">${tagline}</p>
        </div>
        <div class="colTwo">
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </div>
        <div class="colThree">
            <img class="headerPicture" src="${picture}" alt="${name}"></img>
        </div>
        `

        return divHeader
    }
    

    return { picture, getUserCardDOM, getPhotographerHeaderDOM }
}