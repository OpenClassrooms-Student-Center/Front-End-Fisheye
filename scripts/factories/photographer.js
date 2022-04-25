function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        // picture AVATAR
        const img = document.createElement( 'img');
        img.setAttribute("src", picture);
        img.classList.add('photographer__avatar-picture');
        // name AVATAR
        const h2 = document.createElement( 'h2' );
        h2.classList.add('photographer__avatar-name');
        h2.textContent = name;
        //infos city + country
        const paragraphCityCountry = document.createElement('p');
        paragraphCityCountry.classList.add('photographer__avatar-infos-city-country');
        paragraphCityCountry.textContent = `${city}, ${country}`;
        // infos tagline
        const paragraphTagline = document.createElement('p');
        paragraphTagline.classList.add('photographer__avatar-infos-tagline');
        paragraphTagline.textContent = tagline;
        //infos price
        const paragraphPrice = document.createElement('p');
        paragraphPrice.classList.add('photographer__avatar-infos-price');
        paragraphPrice.textContent = `${price} €/jour`;


        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(paragraphCityCountry);
        article.appendChild(paragraphTagline);
        article.appendChild(paragraphPrice);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}