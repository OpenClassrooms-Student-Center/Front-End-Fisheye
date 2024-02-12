function photographerTemplate(data) {
    const { portrait, id, name, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const profilePic = document.createElement( 'img' );
        profilePic.setAttribute("src", picture)

        const identification = document.createElement( 'p' );
        identification.textContent = id;

        const naming = document.createElement( 'h2' );
        naming.textContent = name;

        const cities = document.createElement('p')
        cities.textContent = city;

        const countries = document.createElement('p')
        countries.textContent = country;

        const description = document.createElement('p')
        description.textContent = tagline;

        const pricing = document.createElement('p')
        pricing.textContent = price;

        article.appendChild(profilePic);
        article.appendChild(identification);
        article.appendChild(naming);
        article.appendChild(cities);
        article.appendChild(countries);
        article.appendChild(description);
        article.appendChild(pricing);
        return (article);
    }
    return { picture, id, name, city, country, tagline, price, getUserCardDOM }
}

// test
