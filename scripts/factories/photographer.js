function photographerFactory(data) {
    const {name, portrait, id, city, country, tagline, price} = data;

    const picture = `assets/photographers/artistsPortrait/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.classList.add('article');

        // ajout d'un attribut "data-id" à l'élément article
        article.setAttribute('data-id', id);
        
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.alt= ` Portrait de ${name} `;

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const cityArtist = document.createElement( 'p' );
        cityArtist.textContent = `${city}, ${country}`;
        cityArtist.classList.add('city');

        const taglineArtist = document.createElement ( 'p' );
        taglineArtist.textContent = tagline;
        taglineArtist.classList.add('tagline');

        const priceArtist = document.createElement( 'p' );
        priceArtist.textContent = `${price}€/jour`;
        priceArtist.classList.add('price');

        const link = document.createElement( 'a' );
        link.href = `photographer.html?id=${id}`;

        // ajouter un élément enfant "image", "titre", etc, à un élément "article"
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(cityArtist);
        article.appendChild(taglineArtist);
        article.appendChild(priceArtist);
       
        return (article);

    }
    
    function getPhotographerDom() {
        const div = document.createElement( 'div' );
        div.classList.add('infoPhotographer');

        const img = document.createElement( 'img' );
        img.classList.add('imgPhotographer');
        img.src = picture;
        img.alt= ` Portrait de ${name} `;
        
        const h2 = document.createElement( 'h2' );
        h2.classList.add('namePhotographer');
        h2.textContent = name;
        div.appendChild(h2);
        
        const cityArtist = document.createElement( 'p' );
        cityArtist.textContent = `${city}, ${country}`;
        cityArtist.classList.add('city');
        div.appendChild(cityArtist);
        
        const taglineArtist = document.createElement ( 'p' );
        taglineArtist.textContent = tagline;
        taglineArtist.classList.add('tagline');
        div.appendChild(taglineArtist);
        
        return {div, img};
    }

    return {name, picture, id, city, country, tagline, price, getUserCardDOM, getPhotographerDom}

}

export {photographerFactory};
