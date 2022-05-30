function photographerFactory(data) {
    const { name, portrait, city, tagline, price } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        //DOM elements of photographers card's
        const article = document.createElement('article');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const divCity = document.createElement('div');
        const divTagline = document.createElement('div');
        const divPrice = document.createElement('div');

        //Set attributes and class for the CSS
        img.setAttribute("src", picture);
        divCity.classList.add('city');
        divTagline.classList.add('tagline');
        divPrice.classList.add('price');

        //Text injected in HTML elements
        h2.textContent = name;
        divCity.textContent = city;
        divTagline.textContent = tagline;
        divPrice.textContent = `${price}€/jour`;

        //Add creates element in the DOM
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(divCity);
        article.appendChild(divTagline);
        article.appendChild(divPrice);

        // console.log(article);
        return article;
    }
    // console.log({ name, picture, getUserCardDOM })
    return { name, picture, getUserCardDOM }
   
}