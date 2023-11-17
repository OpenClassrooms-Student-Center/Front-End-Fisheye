function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    function getUserCardDOM() {
        
        const article = document.createElement( 'article' );
        const card =
                    `<a href="photographer.html?id=${id}" title="${name}">
                        <img class="portrait" src="assets/photographers/portrait/${portrait}" alt="${name}">
                        <h2 class="name">${name}</h2>
                    </a>
                    <p class="location">${city}, ${country}</p>
                    <p class="tagline">${tagline}</p>
                    <p class="price">${price}€/jour</p>`;

    article.innerHTML = card;

    return article;

    }

    return { getUserCardDOM }

}

 //const picture = `assets/photographers/portrait/${portrait}`;
// const PhotographerLink = `photographer.html?id=${id}`;

/*
        
        const link = document.createElement('a');
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const location = document.createElement('p');
        const tagLine = document.createElement( 'p' );
        const PhotographerPrice = document.createElement( 'p' );

        link.setAttribute("href", PhotographerLink);      
        link.setAttribute("title", name); 
        img.setAttribute("src", picture);

        h2.textContent = name;
        location.textContent = city + ", " + country;
        tagLine.textContent = tagline;        
        PhotographerPrice.textContent =  price + "€/jour";;      

        article.appendChild(link);

        link.appendChild(img);
        link.appendChild(h2);

        article.appendChild(location);
        article.appendChild(tagLine);
        article.appendChild(PhotographerPrice);
             */