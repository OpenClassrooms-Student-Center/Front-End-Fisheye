function photographerFactory(data) {
    const {name, portrait, id, city, country, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    // fonction permettant d'accéder à la page profil
    function handleClick(e) {
        const article = e.target.closest('article');
    
        // récupérer l'identifiant du profil à partir de l'attribut "data-id" de l'article cliqué
        const profileId = article.getAttribute('data-id');
    
        // redirection vers la page profil correspondante
        window.location.href = `profil.html?id=${profileId}`;
    }

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        // ajout d'un attribut "data-id" à l'élément article
        article.setAttribute('data-id', id);

        article.addEventListener('click', handleClick);
        
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
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

        // ajouter un élément enfant "image", "titre", etc, à un élément "article"
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(cityArtist);
        article.appendChild(taglineArtist);
        article.appendChild(priceArtist);
       
        return (article);
    }
    return {name, picture, id, city, country, tagline, price, getUserCardDOM}
}

export {photographerFactory};

