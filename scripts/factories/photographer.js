function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait} = data;
    
    const picture = `assets/photographers/${portrait}`;
    
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        // BLOC AVATAR + NAME

        const avatarPictureAndName = document.createElement ('a');
        avatarPictureAndName.setAttribute('href', '#');
        avatarPictureAndName.setAttribute('aria-label', 'collection des photos du photographe');
        avatarPictureAndName.setAttribute('aria-current', 'page');
        avatarPictureAndName.classList.add('photographer__avatar');

        // picture AVATAR
        const img = document.createElement( 'img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", '');
        img.classList.add('photographer__avatar-picture');

        // name AVATAR
        const h2 = document.createElement( 'h2' );
        h2.classList.add('photographer__avatar-name');
        h2.textContent = name;

        //BLOC INFOS
        const infos = document.createElement ('div');
        infos.classList.add('photographer__infos');

        //infos city + country
        const paragraphCityCountry = document.createElement('p');
        paragraphCityCountry.classList.add('photographer__infos-city-country');
        paragraphCityCountry.textContent = `${city}, ${country}`;

        // infos tagline
        const paragraphTagline = document.createElement('p');
        paragraphTagline.classList.add('photographer__infos-tagline');
        paragraphTagline.textContent = tagline;
        
        //infos price
        const paragraphPrice = document.createElement('p');
        paragraphPrice.classList.add('photographer__infos-price');
        paragraphPrice.textContent = `${price} €/jour`;


        article.appendChild(avatarPictureAndName);
        avatarPictureAndName.appendChild(img);
        avatarPictureAndName.appendChild(h2);

        article.appendChild(infos);
        infos.appendChild(paragraphCityCountry);
        infos.appendChild(paragraphTagline);
        infos.appendChild(paragraphPrice);

        return (article);
    }
    return { name, id, city, country, tagline, price, portrait, getUserCardDOM }
}