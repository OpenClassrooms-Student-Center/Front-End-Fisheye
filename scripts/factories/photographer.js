function photographerFactory(data) {
    const { name, portrait, city, tagline, price, country, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const linkPhotographer = document.createElement('a');
        linkPhotographer.setAttribute("href", `photographer.html?name=${name}&id=${id}`)
        const containerImg = document.createElement( 'div' );
        containerImg.setAttribute("class", "container_img")
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const userName = document.createElement( 'h2' );
        userName.textContent = name;
        const userLocation = document.createElement( 'h3' );
        userLocation.textContent = `${city}, ${country}`;
        const userTagline = document.createElement( 'span' );
        userTagline.setAttribute("class", "tagline")
        userTagline.textContent = tagline;
        const userPrice = document.createElement( 'span')
        userPrice.setAttribute("class", "price")
        userPrice.textContent = `${price}€/jour`;

        article.appendChild(linkPhotographer)
        linkPhotographer.appendChild(containerImg)
        containerImg.appendChild(img);
        linkPhotographer.appendChild(userName);
        article.appendChild(userLocation);
        article.appendChild(userTagline);
        article.appendChild(userPrice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}